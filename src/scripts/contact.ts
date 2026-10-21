const form = document.querySelector<HTMLFormElement>('#quote-form');
const submitButton = form?.querySelector<HTMLButtonElement>('[type="submit"]');
const buttonText = submitButton?.querySelector('span');
const formStatus = document.querySelector<HTMLParagraphElement>('#form-status');

if (form && submitButton && buttonText && formStatus) {
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type="hidden"]):not([name="_gotcha"]), textarea')];
  let pending = false;

  const announce = (message: string, state: 'error' | 'success' | 'info') => {
    formStatus.textContent = message;
    formStatus.dataset.state = state;
  };
  const validate = (field: HTMLInputElement | HTMLTextAreaElement) => {
    const value = field.value.trim();
    let error = '';
    if (field.required && !value) error = `Please enter ${field.id === 'message' ? 'a description of your project' : `your ${field.id}`}.`;
    else if (field.type === 'email' && field.validity.typeMismatch) error = 'Please enter a valid email address.';
    else if (field.minLength > 0 && value.length < field.minLength) error = `Please enter at least ${field.minLength} characters.`;
    else if (field.maxLength > 0 && value.length > field.maxLength) error = `Please use ${field.maxLength} characters or fewer.`;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) errorElement.textContent = error;
    return !error;
  };
  fields.forEach((field) => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });
  form.noValidate = true;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending) return;
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      announce('Please check the marked fields before sending your enquiry.', 'error');
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    if (data.get('_gotcha')) {
      announce("Your enquiry wasn't sent. Please email me directly.", 'error');
      return;
    }
    const endpoint = form.dataset.endpoint ?? '';
    if (!endpoint) {
      const body = ['name', 'business', 'email', 'package', 'timeline', 'message']
        .map((key) => `${key === 'message' ? 'Project details' : key[0].toUpperCase() + key.slice(1)}: ${String(data.get(key) ?? '').trim()}`)
        .join('\n\n');
      window.location.href = `mailto:contact@ismailstudio.my?subject=${encodeURIComponent('Website enquiry — Ismail Studio')}&body=${encodeURIComponent(body)}`;
      announce('Your email app is ready to open. Review and send your enquiry there. If it does not open, email contact@ismailstudio.my directly.', 'info');
      return;
    }
    pending = true;
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    buttonText.textContent = 'Sending...';
    announce('Sending your enquiry…', 'info');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', body: data,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('The provider did not accept the enquiry.');
      const payload: unknown = await response.json();
      if (!payload || typeof payload !== 'object' || !('ok' in payload) || payload.ok !== true) {
        throw new Error('The provider did not confirm acceptance.');
      }
      form.reset();
      fields.forEach((field) => field.removeAttribute('aria-invalid'));
      announce("Thanks—your enquiry has been submitted. I'll review it and reply by email.", 'success');
    } catch {
      announce("Your enquiry wasn't sent. Please try again or email me directly at contact@ismailstudio.my.", 'error');
    } finally {
      window.clearTimeout(timeout);
      pending = false;
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
      buttonText.textContent = 'Send enquiry';
    }
  });
}
