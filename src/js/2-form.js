let formData = {
  email: "",
  message: "",
};

const STORAGE_KEY = 'feedback-form-state';
const formFeedback = document.querySelector('.feedback-form');

document.addEventListener('DOMContentLoaded', () => {
  const savedData = getFromLS(STORAGE_KEY, {});
  if (savedData?.email || savedData?.message) {
    formData = savedData;
    formFeedback.elements.email.value = savedData.email || '';
    formFeedback.elements.message.value = savedData.message || '';
  }
});


formFeedback.addEventListener('input', e => {
  const email = formFeedback.elements.email.value.trim();
  const message = formFeedback.elements.message.value.trim();

  formData = {
    email,
    message,
  };

  saveToLS(STORAGE_KEY, formData);
});

formFeedback.addEventListener('submit', e => {
  e.preventDefault();

  const email = formFeedback.elements.email.value.trim();
  const message = formFeedback.elements.message.value.trim();

  if (email === '' || message === '') {
    alert('Будь ласка, заповніть обидва поля.');
    return;
  }


  console.log({ email, message });

  formFeedback.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {
    email: '',
    message: '',
  };
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLS(key, defaultValue = {}) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}