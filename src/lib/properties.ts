const API_URL = 'https://xwybcdmaykycuwmctuya.supabase.co';
const PUBLIC_KEY = 'sb_publishable_TM9fdykDPqsyjSCTvHoxWA_98XR4zd3'; // Publishable client key. Never add a secret/service_role key here.

export type PropertyCategory = 'lancamento' | 'novo' | 'usado';
export type PropertyStatus = 'rascunho' | 'publicado' | 'indisponivel';
export type Property = {
 id: string; title: string; slug: string; category: PropertyCategory; kind: string; city: string;
 neighborhood: string; address_summary: string; price: number | null; bedrooms: number | null;
 bathrooms: number | null; parking: number | null; area_m2: number | null;
 description: string; highlights: string[]; image_urls: string[];
 status: PropertyStatus; featured: boolean; created_at?: string; updated_at?: string;
};
export type PropertyDraft = Omit<Property, 'id' | 'created_at' | 'updated_at'>;
type LoginResult = { access_token: string; expires_in: number; refresh_token: string; user: { id:string } };

async function request<T>(path:string, options: RequestInit = {}, token?:string): Promise<T> {
 const headers = new Headers(options.headers);
 headers.set('apikey', PUBLIC_KEY);
 headers.set('Authorization', 'Bearer ' + (token || PUBLIC_KEY));
 if (options.body && !(options.body instanceof Blob) && !(options.body instanceof FormData)) headers.set('Content-Type','application/json');
 const res = await fetch(API_URL + path, {...options, headers});
 if (!res.ok) {
   let message = 'Não foi possível concluir a operação.';
   try { const error = await res.json(); message = error.message || error.error_description || error.msg || message; } catch {}
   throw new Error(message);
 }
 if (res.status === 204 || res.headers.get('content-length') === '0') return undefined as T;
 return res.json() as Promise<T>;
}
export const propertyCategories: {value:PropertyCategory;label:string}[] = [
 { value:'lancamento',label:'Lançamentos / na planta' },
 { value:'novo',label:'Imóveis novos' },
 { value:'usado',label:'Imóveis usados' },
];
export function categoryName(value:PropertyCategory) { return propertyCategories.find(x=>x.value===value)?.label || value; }
export const priceLabel = (v:number|null) => v == null ? 'Valor sob consulta' : new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(v);
export const slugify = (s:string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function listPublicProperties(): Promise<Property[]> {
 return request('/rest/v1/gvs_properties?select=*&status=eq.publicado&order=featured.desc,created_at.desc&limit=100');
}
export function getPublicProperty(slug:string):Promise<Property|null> {
 return request<Property[]>('/rest/v1/gvs_properties?select=*&status=eq.publicado&slug=eq.'+encodeURIComponent(slug)+'&limit=1').then(x=>x[0]||null);
}
export const login = (email:string,password:string) => request<LoginResult>('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
export const adminGranted = (token:string) => request<{user_id:string}[]>('/rest/v1/gvs_property_admins?select=user_id&limit=1',{},token).then(rows=>rows.length>0);
export const listAdminProperties = (token:string) => request<Property[]>('/rest/v1/gvs_properties?select=*&order=updated_at.desc&limit=200',{},token);
export const saveProperty = async (draft: PropertyDraft,token:string,id?:string):Promise<Property> => {
 const url=id?'/rest/v1/gvs_properties?id=eq.'+encodeURIComponent(id):'/rest/v1/gvs_properties';
 const data=await request<Property[]>(url,{method:id?'PATCH':'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(draft)},token);
 if(!data[0])throw new Error('Nenhum registro foi salvo. Confira suas permissões.');
 return data[0];
};
export const removeProperty = (id:string,token:string) => request<void>('/rest/v1/gvs_properties?id=eq.'+encodeURIComponent(id),{method:'DELETE'},token);
export async function uploadPhoto(file:File,token:string):Promise<string>{
 if (!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Use uma imagem JPG, PNG ou WebP.');
 if(file.size>5*1024*1024)throw new Error('Cada foto deve ter no máximo 5 MB.');
 const name=crypto.randomUUID()+'.'+(file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg');
 const objectPath='properties/'+name;
 const res=await fetch(API_URL+'/storage/v1/object/gvs-property-photos/'+objectPath,{
  method:'POST',headers:{apikey:PUBLIC_KEY,Authorization:'Bearer '+token,'Content-Type':file.type,'x-upsert':'false'},body:file
 });
 if(!res.ok){let msg='Falha ao enviar foto.';try{const e=await res.json();msg=e.message||e.error||msg}catch{}throw new Error(msg);}
 return API_URL+'/storage/v1/object/public/gvs-property-photos/'+objectPath;
}
