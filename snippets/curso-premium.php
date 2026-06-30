add_action('wp_footer', function () {
    if (!function_exists('is_singular') || !is_singular('courses')) return;
    ?>
    <style id="aei-curso-css">
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Montserrat:wght@400;500;600;700&family=Sacramento&display=swap');
      :root{--aei-ink:#2A1622;--aei-soft:#5C4150;--aei-muted:#8A7280;--aei-cream:#FDD7E9;--aei-b5:#ED2A8C;--aei-b6:#D6207E;--aei-b7:#AE1565;--aei-grad:linear-gradient(125deg,#D6207E,#B5179E 55%,#7E125A);--aei-shadow:0 26px 60px -30px rgba(42,22,34,.28);--aei-glow:0 18px 45px -18px rgba(237,42,140,.55);}
      body.single-courses{ background:radial-gradient(78% 42% at 50% 0%,#FFE1F0 0%,#FFF6FA 55%) #FFF6FA !important; font-family:'Montserrat',sans-serif; }
      body.single-courses .tutor-course-details-title{ font-family:'Cormorant Garamond',serif !important; font-weight:600 !important; font-size:clamp(2rem,4.5vw,2.8rem) !important; line-height:1.06 !important; color:var(--aei-ink) !important; }
      body.single-courses .tutor-course-thumbnail{ border-radius:24px !important; overflow:hidden !important; box-shadow:var(--aei-shadow); border:1px solid var(--aei-cream); }
      body.single-courses .tutor-course-thumbnail img{ border-radius:24px !important; display:block; width:100%; }
      body.single-courses .tutor-course-details-tab .tutor-nav-link{ font-weight:600 !important; font-size:15px !important; }
      body.single-courses .tutor-course-details-tab .tutor-nav-link.is-active{ color:var(--aei-b6) !important; }
      body.single-courses .tutor-course-about h2, body.single-courses .tutor-course-about h3, body.single-courses .tutor-course-content-title, body.single-courses .tutor-course-details-tab h2, body.single-courses .tutor-course-details-tab h3{ font-family:'Cormorant Garamond',serif !important; font-weight:600 !important; }
      body.single-courses .tutor-card.tutor-sidebar-card, body.single-courses .tutor-single-course-sidebar-more{ border-radius:24px !important; box-shadow:var(--aei-shadow) !important; border:1px solid var(--aei-cream) !important; background:#fff !important; }
      body.single-courses .tutor-course-progress-wrapper{ background:var(--aei-grad) !important; border-radius:18px; padding:20px 22px; margin-bottom:22px; box-shadow:var(--aei-glow); }
      body.single-courses .tutor-course-progress-wrapper h3{ color:#fff !important; font-family:'Cormorant Garamond',serif !important; font-weight:600 !important; font-size:1.45rem !important; margin-bottom:14px !important; }
      body.single-courses .tutor-course-progress-wrapper .tutor-color-secondary,
      body.single-courses .tutor-course-progress-wrapper .progress-steps,
      body.single-courses .tutor-course-progress-wrapper .progress-percentage{ color:rgba(255,255,255,.96) !important; font-weight:600 !important; }
      body.single-courses .tutor-progress-bar{ background:rgba(255,255,255,.3) !important; height:8px !important; border-radius:999px !important; }
      body.single-courses .tutor-progress-value{ background:#fff !important; border-radius:999px !important; }
      body.single-courses .tutor-btn.tutor-btn-primary{ background-image:var(--aei-grad) !important; background-color:transparent !important; border:none !important; border-radius:999px !important; box-shadow:var(--aei-glow) !important; font-weight:700 !important; padding-top:14px !important; padding-bottom:14px !important; transition:transform .2s,box-shadow .2s !important; }
      body.single-courses .tutor-btn.tutor-btn-primary:hover{ transform:translateY(-2px); }
      body.single-courses .tutor-btn.tutor-btn-outline-primary{ border-radius:999px !important; border:1.5px solid var(--aei-cream) !important; color:var(--aei-b6) !important; background-color:#fff !important; font-weight:700 !important; padding-top:14px !important; padding-bottom:14px !important; transition:border-color .2s,background .2s !important; }
      body.single-courses .tutor-btn.tutor-btn-outline-primary:hover{ border-color:var(--aei-b5) !important; background-color:#FFF1F8 !important; color:var(--aei-b7) !important; }
      body.single-courses .tutor-course-details-ratings i, body.single-courses .tutor-icon-star-line, body.single-courses .tutor-icon-star-bold{ color:var(--aei-b5) !important; }
      body.single-courses .tutor-single-course-sidebar-more{ padding:22px !important; }
      body.single-courses .tutor-single-course-sidebar-more h3{ font-family:'Cormorant Garamond',serif !important; font-weight:600 !important; }
    </style>
    <?php
});
