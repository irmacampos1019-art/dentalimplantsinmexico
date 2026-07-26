// Dr. Moguel Site — Main JS
document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu toggle
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var navList = document.querySelector('nav ul');
  if (menuBtn && navList) {
    menuBtn.addEventListener('click', function() { navList.classList.toggle('open'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item h3').forEach(function(h3) {
    h3.addEventListener('click', function() { h3.parentElement.classList.toggle('open'); });
  });

  // Lead capture form
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var data = {
        name: form.querySelector('[name="name"]')?.value || '',
        email: form.querySelector('[name="email"]')?.value || '',
        phone: form.querySelector('[name="phone"]')?.value || '',
        treatmentInterest: form.querySelector('[name="treatment"]')?.value || '',
        message: form.querySelector('[name="message"]')?.value || '',
        sourceWebsite: 'dentalimplantsinmexico.info'
      };
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      fetch('https://lyra-52971c5e.base44.app/functions/captureLead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        form.style.display = 'none';
        var success = document.getElementById('form-success');
        if (success) { success.classList.add('show'); }
      })
      .catch(function(err) {
        if (btn) { btn.disabled = false; btn.textContent = 'Request Free Consultation'; }
        alert('Something went wrong. Please call us at 928-374-4575.');
      });
    });
  }

  // Cost calculator
  var calc = document.getElementById('cost-calculator');
  if (calc) {
    var prices = {
      'single-implant': { us: 4500, mx: 1200 },
      'all-on-4': { us: 28000, mx: 9500 },
      'all-on-6': { us: 32000, mx: 13500 },
      '3-on-8': { us: 38000, mx: 17500 },
      'full-mouth': { us: 35000, mx: 14000 },
      'implant-dentures': { us: 12000, mx: 4500 },
      'bone-graft': { us: 2500, mx: 600 },
      'sinus-lift': { us: 3000, mx: 800 },
      'veneers': { us: 1500, mx: 450 }
    };
    function updateCalc() {
      var procedure = calc.querySelector('#procedure')?.value || 'single-implant';
      var quantity = parseInt(calc.querySelector('#quantity')?.value || '1');
      var p = prices[procedure] || prices['single-implant'];
      var usTotal = p.us * quantity;
      var mxTotal = p.mx * quantity;
      var savings = usTotal - mxTotal;
      var pct = Math.round((savings / usTotal) * 100);
      var results = document.getElementById('calc-results');
      if (results) {
        results.innerHTML =
          '<div class="card-grid">' +
          '<div class="card"><h3>US Cost</h3><p style="font-size:2rem;font-weight:800;color:var(--gray)">$' + usTotal.toLocaleString() + '</p></div>' +
          '<div class="card"><h3>Mexico Cost</h3><p style="font-size:2rem;font-weight:800;color:var(--primary)">$' + mxTotal.toLocaleString() + '</p></div>' +
          '<div class="card"><h3>You Save</h3><p style="font-size:2rem;font-weight:800;color:var(--green)">$' + savings.toLocaleString() + '</p><p>(' + pct + '% savings)</p></div>' +
          '</div>' +
          '<p style="text-align:center;margin-top:24px"><a href="/contact" class="hero-cta" style="color:var(--primary)">Get Your Free Consultation</a></p>';
      }
    }
    var procSelect = calc.querySelector('#procedure');
    var qtyInput = calc.querySelector('#quantity');
    if (procSelect) procSelect.addEventListener('change', updateCalc);
    if (qtyInput) qtyInput.addEventListener('input', updateCalc);
    updateCalc();
  }
});
