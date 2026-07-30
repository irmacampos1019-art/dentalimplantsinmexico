/**
 * Lead Capture Script — dentalimplantsinmexico.info
 * Handles ALL form submissions across the site
 * Sends leads to Base44 backend function for CRM capture
 */
(function() {
  'use strict';

  var CAPTURE_URL = 'https://lyra-52971c5e.base44.app/functions/captureLead';

  function initForms() {
    var forms = document.querySelectorAll('form#lead-form, form.contact-form, form[id*="lead"], form[id*="consult"], form[action*="captureLead"]');
    
    if (forms.length === 0) {
      var allForms = document.querySelectorAll('form');
      allForms.forEach(function(form) {
        if (form.querySelector('input[name="email"]') || form.querySelector('input[type="email"]')) {
          attachHandler(form);
        }
      });
    } else {
      forms.forEach(function(form) {
        attachHandler(form);
      });
    }
  }

  function attachHandler(form) {
    if (form.dataset.leadCaptureAttached) return;
    form.dataset.leadCaptureAttached = 'true';

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSubmit(form);
    });
  }

  function handleSubmit(form) {
    var formData = new FormData(form);
    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
    }

    var data = {
      name: formData.get('name') || formData.get('fullName') || formData.get('full_name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || formData.get('telephone') || formData.get('tel') || '',
      treatmentInterest: formData.get('treatment') || formData.get('treatmentInterest') || formData.get('treatment_interest') || '',
      message: formData.get('message') || formData.get('description') || formData.get('comments') || '',
      sourceWebsite: formData.get('sourceWebsite') || 'dentalimplantsinmexico.info',
      source: 'website_form'
    };

    data.page = window.location.pathname;

    if (!data.email) {
      showMessage(form, 'Please enter your email address.', 'error');
      resetButton(submitBtn, originalBtnText);
      return;
    }

    fetch(CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      return response.json().then(function(result) {
        if (!response.ok || result.error) {
          throw new Error(result.details || result.error || 'Server error');
        }
        return result;
      });
    })
    .then(function(result) {
      form.style.display = 'none';
      showSuccessMessage(form, data);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'lead', {
          'event_category': 'Form',
          'event_label': 'Consultation Request',
          'value': 500,
          'treatment': data.treatmentInterest || 'general'
        });
      }
    })
    .catch(function(error) {
      console.error('Lead capture error:', error);
      showMessage(form, 'Something went wrong. Please call us directly at 928-374-4575 or try again.', 'error');
      resetButton(submitBtn, originalBtnText);
    });
  }

  function showSuccessMessage(form, data) {
    var existingSuccess = form.parentNode.querySelector('#form-success, .form-success');
    
    if (existingSuccess) {
      existingSuccess.style.display = 'block';
      existingSuccess.classList.add('show');
      existingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var successDiv = document.createElement('div');
    successDiv.className = 'form-success show';
    successDiv.style.cssText = 'background: #ecfdf5; border: 1px solid #10B981; padding: 24px; border-radius: 12px; margin-top: 16px; text-align: center;';
    var firstName = data.name ? data.name.split(' ')[0] : '';
    successDiv.innerHTML = 
      '<h3 style="margin-top:0; color: #065f46; font-size: 1.2rem;">\u{1F389} Thank You' + (firstName ? ', ' + firstName : '') + '!</h3>' +
      '<p style="margin-bottom: 8px; color: #065f46; font-size: 0.95rem;">Your request has been submitted successfully. Our patient coordinator will contact you within 24 hours to arrange your free consultation with Dr. Moguel.</p>' +
      '<p style="margin-bottom: 0; color: #065f46; font-size: 0.9rem;">Need to talk now? Call <a href="tel:+19283744575" style="color: #0D9488; font-weight: 700;">928-374-4575</a> or message us on <a href="https://wa.me/19283744575" style="color: #0D9488; font-weight: 700;">WhatsApp</a></p>';
    
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showMessage(form, message, type) {
    var existing = form.parentNode.querySelector('.lead-message');
    if (existing) existing.remove();

    var msgDiv = document.createElement('div');
    msgDiv.className = 'lead-message';
    
    if (type === 'error') {
      msgDiv.style.cssText = 'background: #fef2f2; border: 1px solid #EF4444; color: #991B1B; padding: 16px; border-radius: 8px; margin-top: 12px; font-size: 0.9rem;';
    } else {
      msgDiv.style.cssText = 'background: #ecfdf5; border: 1px solid #10B981; color: #065f46; padding: 16px; border-radius: 8px; margin-top: 12px; font-size: 0.9rem;';
    }
    
    msgDiv.textContent = message;
    form.parentNode.insertBefore(msgDiv, form.nextSibling);
    
    setTimeout(function() {
      if (msgDiv.parentNode) msgDiv.remove();
    }, 5000);
  }

  function resetButton(btn, text) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = text;
      btn.style.opacity = '1';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();
