const API='http://localhost:5000/api/applications';
async function request(url,options){const r=await fetch(url,options);if(!r.ok)throw new Error('Request failed');return r.json();}
export const getApplications=(p={})=>{const q=new URLSearchParams();if(p.search)q.set('search',p.search);if(p.status&&p.status!=='All')q.set('status',p.status);return request(`${API}?${q}`)};
export const getStats=()=>request(`${API}/stats`);
export const createApplication=d=>request(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
export const updateApplication=(id,d)=>request(`${API}/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
export const deleteApplication=id=>request(`${API}/${id}`,{method:'DELETE'});
