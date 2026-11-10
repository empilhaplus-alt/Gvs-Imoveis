import {request} from './properties';

export type InterestStage='novo'|'contatado'|'visita'|'negociacao'|'concluido'|'encerrado';
export type InterestSource='whatsapp'|'telefone'|'indicacao'|'outro';
export type Interest={
 id:string;property_id:string|null;client_name:string;client_phone:string;
 source:InterestSource;stage:InterestStage;notes:string;contact_context:string;next_contact_date:string|null;
 created_by:string|null;created_at:string;updated_at:string;
};
export type InterestInput=Pick<Interest,'property_id'|'client_name'|'client_phone'|'source'|'stage'|'notes'|'contact_context'|'next_contact_date'>;
export const interestStages:{value:InterestStage;label:string}[]=[
 {value:'novo',label:'Novo'}, {value:'contatado',label:'Contatado'}, {value:'visita',label:'Visita agendada'},
 {value:'negociacao',label:'Negociação'}, {value:'concluido',label:'Concluído'}, {value:'encerrado',label:'Encerrado'},
];
export const interestSources:{value:InterestSource;label:string}[]=[
 {value:'whatsapp',label:'WhatsApp'},{value:'telefone',label:'Telefone'},
 {value:'indicacao',label:'Indicação'},{value:'outro',label:'Outro'},
];
export const listInterests=(token:string)=>
 request<Interest[]>('/rest/v1/gvs_property_interests?select=*&order=created_at.desc&limit=200',{},token);
export async function addInterest(data:InterestInput,token:string,userId:string):Promise<Interest>{
 const result=await request<Interest[]>('/rest/v1/gvs_property_interests',{
 method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({...data,created_by:userId})
 },token);
 if(!result[0])throw new Error('O registro não foi salvo.');
 return result[0];
}
export async function updateInterest(row:Interest,token:string):Promise<Interest>{
 const result=await request<Interest[]>('/rest/v1/gvs_property_interests?id=eq.'+encodeURIComponent(row.id),{
 method:'PATCH',headers:{Prefer:'return=representation'},
 body:JSON.stringify({stage:row.stage,notes:row.notes,next_contact_date:row.next_contact_date,updated_at:new Date().toISOString()})
 },token);
 if(!result[0])throw new Error('O registro não foi atualizado.');
 return result[0];
}
export const deleteInterest=(id:string,token:string)=>request<void>(
 '/rest/v1/gvs_property_interests?id=eq.'+encodeURIComponent(id),{method:'DELETE'},token);
