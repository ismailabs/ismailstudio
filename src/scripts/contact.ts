const form = document.querySelector<HTMLFormElement>('#quote-form');
const submitButton = form?.querySelector<HTMLButtonElement>('[type="submit"]');
const buttonText = submitButton?.querySelector('span');
const formStatus = document.querySelector<HTMLParagraphElement>('#form-status');

if (form && submitButton && buttonText && formStatus) {
  const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type="hidden"]):not([name="_gotcha"]), textarea')];
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  let step = 1;
  let pending = false;
  const announce = (message: string, state: 'error' | 'success' | 'info') => {
    formStatus.textContent = message;
    formStatus.dataset.state = state;
  };
  const review = () => {
    const summary = form.querySelector('#enquiry-review');
    if (!summary) return;
    summary.replaceChildren();
    const data = new FormData(form);
    for (const [key, label] of [['name', 'Name'], ['business', 'Business name'], ['email', 'Email'], ['package', 'Package'], ['timeline', 'Target timeline'], ['message', 'Project needs']]) {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const value = document.createElement('dd');
      term.textContent = label;
      value.textContent = String(data.get(key) ?? '').trim() || 'Not supplied';
      row.append(term, value);
      summary.append(row);
    }
  };
  const showStep = (next: number, focus = true) => {
    step = next;
    steps.forEach(fieldset => { fieldset.hidden = Number(fieldset.dataset.step) !== step; });
    form.querySelectorAll<HTMLElement>('[data-progress]').forEach(item => {
      if (Number(item.dataset.progress) === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    submitButton.hidden = step !== 3;
    if (step === 3) review();
    if (focus) form.querySelector<HTMLElement>(`[data-step="${step}"] legend`)?.focus({ preventScroll: false });
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
  const checkFields = (all = false) => {
    const invalid = fields.filter(field => (all || Number(field.closest<HTMLFieldSetElement>('[data-step]')?.dataset.step) === step) && !validate(field));
    if (!invalid.length) return true;
    showStep(Number(invalid[0].closest<HTMLFieldSetElement>('[data-step]')?.dataset.step ?? 1), false);
    announce('Please check the marked fields before continuing.', 'error');
    invalid[0].focus();
    return false;
  };
  fields.forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  });
  form.noValidate = true;
  form.classList.add('js-form');
  form.querySelector<HTMLElement>('.form-progress')?.removeAttribute('hidden');
  form.querySelectorAll<HTMLButtonElement>('[data-next], [data-back]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      if (pending) return;
      if (button.dataset.back) { showStep(Number(button.dataset.back)); announce(`Step ${step} of 3. Your details have been kept.`, 'info'); }
      else if (checkFields(button.dataset.next === '3')) { showStep(Number(button.dataset.next)); announce(`Step ${step} of 3.`, 'info'); }
    });
  });
  showStep(1, false);
  form.addEventListener('package-chosen', () => { if (!pending) showStep(2); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    if (step < 3) { if (checkFields(step === 2)) showStep(step + 1); return; }
    if (!checkFields(true)) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) { announce("Your enquiry wasn't sent. Please email me directly.", 'error'); return; }
    const endpoint = form.dataset.endpoint ?? '';
    if (!endpoint) {
      const body = ['name', 'business', 'email', 'package', 'timeline', 'message'].map(key => `${key}: ${String(data.get(key) ?? '').trim()}`).join('\n\n');
      window.location.href = `mailto:contact@ismailstudio.my?subject=${encodeURIComponent('Website enquiry — Ismail Studio')}&body=${encodeURIComponent(body)}`;
      announce('Your email app is ready to open. Review and send your enquiry there. If it does not open, email contact@ismailstudio.my directly.', 'info');
      return;
    }
    pending = true;
    submitButton.disabled = true;
    form.querySelectorAll<HTMLButtonElement>('[data-back]').forEach(button => { button.disabled = true; });
    form.setAttribute('aria-busy', 'true');
    buttonText.textContent = 'Sending...';
    announce('Sending your enquiry…', 'info');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('The provider did not accept the enquiry.');
      const payload: unknown = await response.json();
      if (!payload || typeof payload !== 'object' || !('ok' in payload) || payload.ok !== true) throw new Error('The provider did not confirm acceptance.');
      form.reset();
      fields.forEach(field => { field.removeAttribute('aria-invalid'); const error = document.getElementById(`${field.id}-error`); if (error) error.textContent = ''; });
      showStep(1);
      announce("Thanks—your enquiry has been submitted. I'll review it and reply by email.", 'success');
    } catch {
      announce("Your enquiry wasn't sent. Please try again or email me directly at contact@ismailstudio.my.", 'error');
    } finally {
      window.clearTimeout(timeout);
      pending = false;
      submitButton.disabled = false;
      form.querySelectorAll<HTMLButtonElement>('[data-back]').forEach(button => { button.disabled = false; });
      form.removeAttribute('aria-busy');
      buttonText.textContent = 'Send enquiry';
    }
  });
}
