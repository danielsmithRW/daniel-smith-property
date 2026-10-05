const menu=document.querySelector('.menu');const nav=document.querySelector('nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation menu')}))}

// Appraisal enquiry via Web3Forms
const appraisalForm=document.querySelector('#appraisal-form');
if(appraisalForm){
  const status=document.querySelector('#form-status');
  appraisalForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const button=appraisalForm.querySelector('.appraisal-submit');
    const original=button.textContent;
    button.disabled=true;
    button.textContent='Sending...';
    status.className='form-status';
    status.textContent='';
    try{
      const data=new FormData(appraisalForm);
      const response=await fetch(appraisalForm.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
      const result=await response.json();
      if(response.ok&&result.success){
        status.className='form-status success';
        status.innerHTML='<strong>Thanks - your property details have been sent.</strong><br>Daniel will be in touch.';
        appraisalForm.reset();
      }else{throw new Error(result.message||'Submission failed');}
    }catch(error){
      status.className='form-status error';
      status.innerHTML='Something went wrong sending the form. Please call <a href="tel:0434544964">0434 544 964</a> or email <a href="mailto:daniel.smith@raywhite.com">daniel.smith@raywhite.com</a>.';
    }finally{
      button.disabled=false;
      button.textContent=original;
    }
  });
}
