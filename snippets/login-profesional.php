<?php
/*
 * Snippet "Login profesional" (Code Snippets, global).
 * Capa de diseño sobre "Registro y login rosa" (snippet #8): misma estructura (panel fucsia + formulario),
 * logo oficial en blanco, título en el formulario, etiquetas sin mayúsculas, campos y botón más limpios.
 */
add_action( 'login_head', function () { ?>
<style id="aei-login-pro">
/* Login más profesional: misma estructura (panel fucsia + formulario), mejor acabado */
#aei-hero{padding:64px clamp(32px,6vw,96px);}
#aei-hero > *{max-width:470px;}
#aei-hero .aei-wm{font-size:0;line-height:0;width:230px;height:105px;background:url("https://cdn.jsdelivr.net/gh/DEIV0510/almaeimagen@d55d79a6f9ce98e7b9734b579bb9d344963c9d4b/assets/marca/logo-blanco.webp") left center/contain no-repeat;}
#aei-hero .aei-wm span{display:none;}
#aei-hero h2{font-size:2.9rem;line-height:1.08;letter-spacing:-.005em;margin:40px 0 28px;max-width:11em;text-wrap:balance;}
#aei-hero ul{gap:14px;}
#aei-hero li{font-size:15px;font-weight:500;color:rgba(255,255,255,.92);}
#aei-hero li::before{width:26px;height:26px;font-size:12px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.35);}
#aei-hero .aei-sign{font-size:1.9rem;margin-top:44px;opacity:.9;}

#login{align-items:center;}
#login > *{width:100%;max-width:420px;}
#login::before{display:none !important;}
#aei-login-head{margin:0 0 28px;}
#aei-login-head h2{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:2.6rem;line-height:1.05;color:#2A1622;margin:0;}
#aei-login-head p{margin:10px 0 0;color:#6B5060;font-size:15px;line-height:1.55;}
#login form{max-width:420px;}
#login form p,#login .user-pass-wrap{margin-bottom:18px;}
.login label{display:block;margin-bottom:8px;font-size:13px;font-weight:600;letter-spacing:0;text-transform:none;color:#2A1622;}
.login form .input,.login input[type=text],.login input[type=password],.login input[type=email]{height:52px;margin:0 !important;padding:0 16px !important;border-radius:12px !important;border:1px solid #EBCFDD !important;font-size:15px;color:#2A1622;}
.login .wp-pwd{position:relative;}
.login .wp-pwd input[type=password],.login .wp-pwd input[type=text]{padding-right:52px !important;}
.login .button.wp-hide-pw{position:absolute;top:0;right:0;width:52px;height:52px;min-height:52px;margin:0;padding:0;border:0 !important;background:transparent !important;box-shadow:none !important;color:#AE1565;display:flex;align-items:center;justify-content:center;}
.login .button.wp-hide-pw .dashicons{width:20px;height:20px;font-size:20px;color:#AE1565;top:0;}
.login .button.wp-hide-pw:focus-visible{outline:2px solid #D6207E;outline-offset:-4px;border-radius:12px;}
.login .forgetmenot{display:flex;align-items:center;gap:8px;float:none;margin:4px 0 22px !important;}
.login .forgetmenot label{display:inline;margin:0;font-size:14px;font-weight:500;color:#5C4150;}
.login input[type=checkbox]{width:18px;height:18px;margin:0;border:1px solid #D9AFC5;border-radius:5px;box-shadow:none;accent-color:#D6207E;}
.login input[type=checkbox]:checked::before{color:#D6207E;}
.login input[type=checkbox]:focus{border-color:#D6207E;box-shadow:0 0 0 3px rgba(214,32,126,.15);}
.login .wp-tooltip__toggle{color:#B98AA2;background:none;border:0;padding:0;}
.login .wp-tooltip__toggle .dashicons{font-size:17px;width:17px;height:17px;}
.login .submit{margin:0;padding:0;clear:both;}
.wp-core-ui .button-primary{float:none !important;display:block;width:100%;height:52px;min-height:52px;line-height:52px;padding:0 !important;margin:0 !important;font-size:15px !important;font-weight:600 !important;letter-spacing:.02em;box-shadow:none !important;}
.wp-core-ui .button-primary:focus{box-shadow:0 0 0 3px #fff,0 0 0 5px #D6207E !important;}
.login #nav{margin:22px 0 0 !important;padding:0 !important;font-size:14px;color:#C9A9B9;}
.login #nav a,.login #backtoblog a{text-decoration:none;font-weight:600;}
.login #nav a:hover,.login #backtoblog a:hover{text-decoration:underline;text-underline-offset:3px;}
.login #backtoblog{margin:14px 0 0 !important;padding:0 !important;font-size:13px;}
.login #backtoblog a{color:#8A6C7C !important;font-weight:500;}
.login .message,.login .notice,.login #login_error{max-width:420px;margin:0 0 20px;padding:12px 16px;border:1px solid #F3D3E3;border-left:3px solid #D6207E !important;border-radius:12px;box-shadow:none;font-size:14px;color:#2A1622;}
#aei-reg-head{max-width:420px;}
@media(max-width:820px){
  body.login{align-content:flex-start;}
  #login{justify-content:flex-start;}
  #aei-hero{padding:30px 24px 28px;}
  #aei-hero .aei-wm{width:170px;height:78px;}
  #aei-hero h2{font-size:1.9rem;margin:18px 0 0;max-width:none;}
  #login{padding:34px 22px 44px !important;}
  #aei-login-head h2{font-size:2.1rem;}
}
</style>
<?php }, 999 );

add_action( 'login_footer', function () { ?>
<script>
(function(){
  var b = document.body, login = document.getElementById('login');
  if(!login) return;
  // Título y subtítulo del formulario (en registro ya existe #aei-reg-head)
  var textos = null;
  if(b.classList.contains('login-action-login')) textos = ['Bienvenida de nuevo', 'Ingresa para continuar tu proceso en The Academy.'];
  else if(b.classList.contains('login-action-lostpassword')) textos = ['Recupera tu acceso', 'Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva.'];
  if(textos && !document.getElementById('aei-login-head')){
    var h = document.createElement('div');
    h.id = 'aei-login-head';
    h.innerHTML = '<h2></h2><p></p>';
    h.querySelector('h2').textContent = textos[0];
    h.querySelector('p').textContent = textos[1];
    var primero = login.querySelector('.message, .notice, #login_error, form');
    login.insertBefore(h, primero);
  }
  // En recuperar acceso, la instrucción de WordPress repite el subtítulo
  if(b.classList.contains('login-action-lostpassword')){
    var n = login.querySelector('.notice-info.message');
    if(n && /introduce tu nombre de usuario|enter your username/i.test(n.textContent||'')) n.style.display = 'none';
  }
  // Etiqueta más corta para el usuario
  var lbl = document.querySelector('label[for="user_login"]');
  if(lbl && /nombre de usuario o correo/i.test(lbl.textContent)) lbl.textContent = 'Correo electrónico o usuario';
  // Enlace de volver
  var back = document.querySelector('#backtoblog a');
  if(back) back.textContent = '← Volver a Alma e Imagen';
})();
</script>
<?php }, 999 );
