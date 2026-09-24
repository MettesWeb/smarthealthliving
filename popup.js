(function(){
  'use strict';

  const script=document.currentScript;
  const delay=Number(script&&script.dataset.delay)||6000;
  let timer=null;
  let previousFocus=null;

  const shell=document.createElement('div');
  shell.innerHTML=`<div class="popup" id="detoxPopup" role="dialog" aria-modal="true" aria-labelledby="detoxTitle" aria-hidden="true">
  <div class="pop-card">
    <button class="pop-close" type="button" aria-label="Schließen">×</button>
    <div class="pop-layout">
      <div class="pop-image image">
        <img src="assets/energieplan-frau-portrait.png" alt="Energiegeladene Frau mit gesundem Smoothie für den 9-Wochen-Energieplan">
        <span class="ki">KI</span>
      </div>
      <div class="pop-body">
        <span class="kicker">Kostenloser Download</span>
        <h2 id="detoxTitle" style="margin-top:9px">Dein 9‑Wochen‑Energieplan</h2>
        <p>Hol dir den kostenlosen 9‑Wochen‑Energieplan mit Rezeptideen, Routinen und Einkaufslisten für mehr Energie im Alltag. Für den Download meldest du dich einmal zum Smart Health Living Newsletter an.</p>
        <form class="form" id="detoxPopupForm" method="POST" action="https://8ca2e11c.sibforms.com/serve/MUIFAECIlrFVXQ0mf3Iz27huZzbWZZDHbft05MAfB5OfQIAG1VRSFjrieiX5K_V2x82q4Xr1V5DR2SCQIfP48T5cZazpDZq6Sa5Wn3BTZbraOMltC9H5aE4VXklZoyL0dWyJxXPjPMa2AMD0VtbT9r0-9pwns7kIcI3H8AH61P_daz53buZ7XGRXbdoXontTxNLWnFANjAwLL7Wvkg==" target="brevoPopupFrame">
          <input type="email" name="EMAIL" placeholder="Deine E-Mail-Adresse" aria-label="Deine E-Mail-Adresse" autocomplete="email" required>
          <label class="optin"><input type="checkbox" name="OPT_IN" value="1" required><span>Ich möchte den Smart Health Living Newsletter erhalten und akzeptiere die Datenschutzerklärung. Eine Abmeldung ist jederzeit möglich.</span></label>
          <input type="text" name="email_address_check" value="" style="display:none" autocomplete="off" tabindex="-1" aria-hidden="true">
          <input type="hidden" name="locale" value="de">
          <button class="btn" type="submit">Anmelden & Energieplan sichern →</button>
        </form>
        <div class="success" id="detoxPopupSuccess" role="status" aria-live="polite"><strong>Fast geschafft.</strong><div class="small">Bitte bestätige jetzt die E-Mail von Brevo. Danach kann dein Guide automatisch zugestellt werden.</div></div>
        <div class="small" style="margin-top:9px">Double Opt-in · Brevo · <a href="datenschutz.html" style="text-decoration:underline">Datenschutz</a></div>
        <iframe name="brevoPopupFrame" title="Newsletter-Anmeldung" style="display:none"></iframe>
      </div>
    </div>
  </div>
</div>`;

  const popup=shell.firstElementChild;
  document.body.appendChild(popup);
  const closeButton=popup.querySelector('.pop-close');
  const form=popup.querySelector('#detoxPopupForm');
  const success=popup.querySelector('#detoxPopupSuccess');

  function openPopup(){
    if(timer){clearTimeout(timer);timer=null;}
    previousFocus=document.activeElement;
    popup.classList.add('open');
    popup.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeButton.focus();
  }

  function closePopup(){
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(previousFocus&&typeof previousFocus.focus==='function') previousFocus.focus();
  }

  window.openDetoxPopup=openPopup;
  window.closeDetoxPopup=closePopup;

  popup.addEventListener('click',function(event){
    if(event.target===popup) closePopup();
  });
  closeButton.addEventListener('click',closePopup);
  document.addEventListener('keydown',function(event){
    if(!popup.classList.contains('open')) return;
    if(event.key==='Escape'){
      event.preventDefault();
      closePopup();
      return;
    }
    if(event.key==='Tab'){
      const focusable=[...popup.querySelectorAll('button,input,a[href]')].filter(element=>!element.disabled&&element.tabIndex!==-1);
      if(!focusable.length) return;
      const first=focusable[0];
      const last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('pageshow',function(){
    if(timer) clearTimeout(timer);
    timer=setTimeout(openPopup,delay);
  });
  form.addEventListener('submit',function(){
    setTimeout(function(){success.style.display='block';},650);
  });
})();
