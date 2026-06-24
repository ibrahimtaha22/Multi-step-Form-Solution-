let currentStep = 1;

let formData = {
  name: "",
  email: "",
  phone: "",
};

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

const dynamicInputs = document.querySelectorAll(
  '[data-name="dynamic-update-inputs"]',
);

const nextBtn = document.querySelector("#next-btn");

const prevBtn = document.querySelector("#prev-btn");

const setError = (element, isError) => {
  if (element) {
    element.style.border = isError ? "1px solid red" : "1px solid #ccc";
  }
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern = /^\+?[0-9]\d{6,14}$/;

nameInput.addEventListener("blur", () =>
  setError(nameInput, nameInput.value.trim() === ""),
);
emailInput.addEventListener("blur", () =>
  setError(emailInput, !emailPattern.test(emailInput.value.trim())),
);
phoneInput.addEventListener("blur", () =>
  setError(phoneInput, !phonePattern.test(phoneInput.value.trim())),
);

function validateStepOne() {
  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  const isNameValid = nameVal !== "";
  const isEmailValid = emailPattern.test(emailVal);
  const isPhoneValid = phonePattern.test(phoneVal);

  setError(nameInput, !isNameValid);
  setError(emailInput, !isEmailValid);
  setError(phoneInput, !isPhoneValid);

  return isNameValid && isEmailValid && isPhoneValid;
}

function updateSidebarCircle(stepNumber) {
  const allCircles = document.querySelectorAll(".step-circle");
  allCircles.forEach((circle) => {
    circle.classList.remove(
      "bg-blue-200",
      "text-blue-900",
      "border-transparent",
    );
    circle.classList.add("border-white", "text-white");
  });

  const activeCircle = document.querySelector(`#circle-${stepNumber}`);
  if (activeCircle) {
    activeCircle.classList.remove("border-white", "text-white");
    activeCircle.classList.add(
      "bg-blue-200",
      "text-blue-900",
      "border-transparent",
    );
  }
}

function navigateToStep(targetStep) {
  const currentStepElement = document.querySelector(`#step-${currentStep}`);
  const targetStepElement = document.querySelector(`#step-${targetStep}`);

  if (currentStepElement && targetStepElement) {
    currentStepElement.classList.remove("step-active");
    currentStepElement.classList.add("hidden");

    targetStepElement.classList.remove("hidden");
    targetStepElement.classList.add("step-active");

    currentStep = targetStep;
    updateSidebarCircle(currentStep);

    manageButtonsVisibility();
  }
}

function manageButtonsVisibility() {
  if (currentStep === 5) {
    nextBtn.parentElement.classList.add("hidden");
    return;
  }

  if (currentStep === 1) {
    prevBtn.classList.add("invisible");
    prevBtn.classList.add("opacity-0");
  } else {
    prevBtn.classList.remove("invisible");
    prevBtn.classList.remove("opacity-0");
  }

  if (currentStep === 4) {
    nextBtn.textContent = "Confirm";
    nextBtn.classList.remove("bg-blue-900");
    nextBtn.classList.add("bg-purple-600");
  } else {
    nextBtn.textContent = "Next Step";
    nextBtn.classList.remove("bg-purple-600");
    nextBtn.classList.add("bg-blue-900");
  }
}

const BACKEND_URL =
  "https://gaming-form-backend.vercel.app/api/verify-checkout";

nextBtn.addEventListener("click", () => {
  if (currentStep === 1) {
    if (!validateStepOne()) {
      alert("Please make sure you fill out all fields correctly.");
      return;
    }
    navigateToStep(currentStep + 1);
  } else if (currentStep === 3) {
    const oldAddons = document.querySelectorAll(
      '[data-name="step-4_adds-on-plan"]',
    );
    oldAddons.forEach((addon) => addon.remove());

    const oldResult = document.querySelector("#Total-price");
    oldResult.textContent = "";

    const checkedInputs = document.querySelectorAll("input:checked");
    let totalPrice = [];
    let result = 0;
    checkedInputs.forEach((input) => {
      if (input.type === "radio") {
        let parentElement = input.parentElement;
        let mainPlanName = parentElement
          .querySelector("h3[data-name='plan-name']")
          .textContent.trim();
        document.querySelector("#s4_choosen-plan").textContent = mainPlanName;

        let MainPlanPrice = parentElement
          .querySelector("p:not(.hidden)[data-name]")
          .childNodes[0].textContent.trim();
        document.querySelector("#s4_choosen-price").textContent = MainPlanPrice;

        totalPrice.push(parseFloat(MainPlanPrice.match(/\d+/)[0]));
      } else if (input.type === "checkbox") {
        let grandParentElement = input.parentElement.parentElement;
        let AddsOnPlanName = grandParentElement
          .querySelector("h3[data-name='add-ons-plan-name']")
          .textContent.trim();
        let AddsOnPlanPrice = grandParentElement
          .querySelector("span:not(.hidden)")
          .textContent.trim();

        totalPrice.push(parseFloat(AddsOnPlanPrice.match(/\d+/)[0]));
        insertAddsOnBlockElement(AddsOnPlanName, AddsOnPlanPrice);
      }
    });

    totalPrice.forEach((num) => (result += num));
    document.querySelector("#Total-price").textContent = result;
    navigateToStep(currentStep + 1);
  } else if (currentStep === 2) {
    navigateToStep(currentStep + 1);
  } else if (currentStep === 4) {
    UpdateFormData();
    sendDataToBackend();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    navigateToStep(currentStep - 1);
  }
});

manageButtonsVisibility();

const ClickOnPlan = () => {
  const stepTwoButtons = document.querySelectorAll('[name="plan"]');

  stepTwoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const checkedPlan = document.querySelector(`[name="plan"][checked]`);
      checkedPlan.removeAttribute("checked");
      checkedPlan.parentElement.classList.remove(
        "bg-blue-50",
        "border-blue-900",
      );
      checkedPlan.parentElement.classList.add("border-gray-300");
      button.setAttribute("checked", "");
      HighlightClickedPlan();
    });
  });
};

ClickOnPlan();

const HighlightClickedPlan = () => {
  const clickedPlan = document.querySelector(`[name="plan"][checked]`);
  clickedPlan.parentElement.classList.add("bg-blue-50", "border-blue-900");
  clickedPlan.parentElement.classList.remove("border-gray-300");
};

const monthlyLabel = document.querySelector("#monthly-label");
const yearlyLabel = document.querySelector("#yearly-label");
const toggleButton = document.querySelector('[data-name="toggle-button"]');
let changePer = document.querySelector("#Total-subscription");
const yearPlanNodeElements = document.querySelectorAll(
  '[data-name="yearly-plan"],[data-name="add-ons-year-plan"],[id="s4-total-per-year"]',
);
const monthlyPlanNodeElements = document.querySelectorAll(
  '[data-name="monthly-plan"],[data-name="add-ons-monthly-plan"],[id="s4-total-per-month"]',
);
toggleButton.addEventListener("click", () => {
  toggleButton.firstElementChild.classList.toggle("translate-x-5");
  const isYearly =
    toggleButton.firstElementChild.classList.contains("translate-x-5");
  const isMonthly = !isYearly;

  if (isYearly) {
    monthlyLabel.classList.remove("text-blue-900");
    monthlyLabel.classList.add("text-gray-400");
    yearlyLabel.classList.remove("text-gray-400");
    yearlyLabel.classList.add("text-blue-900");
  } else {
    monthlyLabel.classList.add("text-blue-900");
    monthlyLabel.classList.remove("text-gray-400");
    yearlyLabel.classList.add("text-gray-400");
    yearlyLabel.classList.remove("text-blue-900");
  }

  yearPlanNodeElements.forEach((element) => {
    if (isYearly) {
      element.classList.remove("hidden");
      element.classList.add("step-active");
    } else {
      element.classList.remove("step-active");
      element.classList.add("hidden");
    }
  });

  monthlyPlanNodeElements.forEach((element) => {
    if (isMonthly) {
      element.classList.remove("hidden");
      element.classList.add("step-active");
    } else {
      element.classList.remove("step-active");
      element.classList.add("hidden");
    }
  });
  isYearly ? (changePer.textContent = "/yr") : (changePer.textContent = "/mo");
});

const changeBtnElement = document.querySelector("#change-plan-btn");
changeBtnElement.addEventListener("click", () => {
  navigateToStep(2);
});

let number = 1;

const insertAddsOnBlockElement = (Adds_on_plan, Adds_on_price) => {
  const stringElement = `
  <div id="plan-n-${number}" data-name="step-4_adds-on-plan" class="flex justify-between items-center text-gray-400 text-sm">
 ${Adds_on_plan}
  <span id="price-n-${number}"  data-name="step-4_adds-on-price" class="text-black">
   ${Adds_on_price}
  </span>
  </div>`;

  const domElement = document
    .createRange()
    .createContextualFragment(stringElement)
    .children.item(0);

  document
    .querySelector("#sibling-for-adjacent-insert")
    .insertAdjacentElement("afterend", domElement);

  number++;
};

const validateCheckedInputs = (Adds_on_plan, Adds_on_price) => {
  const nodeElements = document.querySelectorAll(
    '[data-name="step-4_adds-on-plan"],[data-name="step-4_adds-on-price"]',
  );

  let booleanArr = [];

  if (nodeElements) {
    for (let index = 0; index < nodeElements.length; index++) {
      const elementText = nodeElements.item(index).textContent.trim();

      if (elementText === Adds_on_plan || elementText === Adds_on_price) {
        booleanArr.push(true);
      } else {
        booleanArr.push(false);
      }
    }
  }

  return booleanArr.every((item) => item === true);
};

function sendDataToBackend() {
  const planName = document
    .querySelector("#s4_choosen-plan")
    .textContent.trim();

  const subscriptionText = document
    .querySelector("#Total-subscription")
    .textContent.trim();
  const billingCycle = subscriptionText.includes("yr") ? "yearly" : "monthly";

  const addons = [];
  document
    .querySelectorAll('[data-name="step-4_adds-on-plan"]')
    .forEach((addon) => {
      const addonName = addon.childNodes[0].textContent.trim();
      if (addonName) {
        addons.push(addonName);
      }
    });

  const frontendTotalText = document
    .querySelector("#Total-price")
    .textContent.trim();
  const frontendTotal = parseInt(frontendTotalText) || 0;

  const orderData = {
    planName: planName,
    billingCycle: billingCycle,
    addons: addons,
    frontendTotal: frontendTotal,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
  };
  console.log(orderData);

  nextBtn.innerText = "Verifying...";
  nextBtn.disabled = true;

  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        navigateToStep(5);

        nextBtn.style.display = "none";
        if (prevBtn) prevBtn.style.display = "none";
      }
    })
    .catch((error) => {
      alert(`${error.message || "An error occurred. Please try again"}`);

      nextBtn.innerText = "Confirm";
      nextBtn.disabled = false;
    });
}

const UpdateFormData = () => {
  formData.name = dynamicInputs[0].value;
  formData.email = dynamicInputs[1].value;
  formData.phone = dynamicInputs[2].value;
};
