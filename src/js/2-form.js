const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
    email: '',
    message: '',
};

loadFormData();

form.addEventListener('input', event => {
    const { name, value } = event.target;
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const { email, message } = formData;
    if (!email.trim() || !message.trim()) {
        alert('Fill please all fields');
        return;
    }

console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});

function loadFormData() {
  try {
    const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saveData) {
      formData.email = saveData.email || '';
      formData.message = saveData.message || '';
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Error reading localStorage data:', error);
  }
};
