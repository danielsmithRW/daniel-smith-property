const menu=document.querySelector('.menu');const nav=document.querySelector('nav');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}

// Appraisal enquiry: zero-cost email handoff for static GitHub Pages hosting
const appraisalForm=document.querySelector('#appraisal-form');
if(appraisalForm){
  appraisalForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(appraisalForm);
    const name=(data.get('name')||'').trim();
    const address=(data.get('address')||'').trim();
    const email=(data.get('email')||'').trim();
    const phone=(data.get('phone')||'').trim();
    const intent=data.get('intent')||'Property appraisal';
    const notes=(data.get('notes')||'').trim();
    const subject='Property enquiry — '+address;
    const body=[
      'Hi Daniel,',
      '',
      'I would like to discuss my property.',
      '',
      'Name: '+name,
      'Property: '+address,
      'Email: '+(email||'Not provided'),
      'Phone: '+(phone||'Not provided'),
      'Enquiry: '+intent,
      '',
      'Property notes:',
      notes||'None provided',
      '',
      'Sent from danielsmithrw.github.io/daniel-smith-property/'
    ].join('\n');
    window.location.href='mailto:daniel.smith@raywhite.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });
}
