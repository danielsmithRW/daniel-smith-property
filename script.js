// Google Analytics 4
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-GVXLGHKB7D');
const googleTag=document.createElement('script');
googleTag.async=true;
googleTag.src='https://www.googletagmanager.com/gtag/js?id=G-GVXLGHKB7D';
document.head.appendChild(googleTag);

const menu=document.querySelector('.menu');const nav=document.querySelector('nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation menu')}))}

// Route email links to the on-site enquiry form
const onHomePage=location.pathname==='/'||location.pathname.endsWith('/index.html');
const enquiryTarget=onHomePage?'#appraisal':'index.html#appraisal';
document.querySelectorAll('a[href^="mailto:"]').forEach(link=>{
  link.setAttribute('href',enquiryTarget);
});

// Sitewide legal, agency and privacy information
const footerBottom=document.querySelector('.footer-bottom');
if(footerBottom){
  const oldFine=footerBottom.querySelector('.fine');
  if(oldFine) oldFine.remove();
  const legal=document.createElement('p');
  legal.className='fine';
  legal.innerHTML='Dunace Pty Ltd T/as Ray White Nowra · ABN 80 003 551 942 · Licence No. 271-832<br><a href="legal.html">Legal &amp; Disclaimer</a> · <a href="https://www.raywhite.com/franchisee-privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a> · <a href="https://www.raywhite.com/contact/collection-notice-for-privacy-purposes-and-consent/" target="_blank" rel="noopener">Collection Notice</a>';
  footerBottom.appendChild(legal);
}

// Appraisal privacy / collection notice
const appraisalForm=document.querySelector('#appraisal-form');
if(appraisalForm){
  const existingNote=appraisalForm.querySelector('.form-note');
  const privacy=document.createElement('p');
  privacy.className='form-note privacy-consent';
  privacy.innerHTML='By submitting this form, you consent to your personal information being collected and used to respond to your enquiry and provide relevant real estate services. See the <a href="https://www.raywhite.com/franchisee-privacy-policy/" target="_blank" rel="noopener">Ray White Franchisee Privacy Policy</a> and <a href="https://www.raywhite.com/contact/collection-notice-for-privacy-purposes-and-consent/" target="_blank" rel="noopener">Collection Notice</a>.';
  if(existingNote) existingNote.insertAdjacentElement('afterend',privacy); else appraisalForm.appendChild(privacy);

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
