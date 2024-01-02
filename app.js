//Navbar
let links = document.querySelector(".links");

links.addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.classList.contains("nav-link")) return;

    let link = e.target;
    let section = document.querySelector(`[data-id=${link.getAttribute("href")}]`);
    section.scrollIntoView({ behavior: "smooth" });
})

//Skills animation
let skills = document.querySelectorAll(".skill");

let showSkill = function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let skillTarget = entry.target;
        skillTarget.classList.remove("skill--hidden");
        observer.unobserve(skillTarget);
    });
}

let sectionsObserverOptions = {
    threshold: 0.5,
    root: null
}

let skillsObserver = new IntersectionObserver(showSkill, { sectionsObserverOptions });
skills.forEach(skill => {
    skillsObserver.observe(skill);
    skill.classList.add("skill--hidden");
});

//SLIDER
let slides = Array.from(document.querySelectorAll(".slide"));
let slidesCount = slides.length;
let rightButton = document.querySelector(".btn-right");
let leftButton = document.querySelector(".btn-left");
let currentSlide = 2;

let moveSlides = function () {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - currentSlide) * 700}px) scale(0.7)`;
        slide.style.opacity = "0.4";
    });

    slides[currentSlide].style.transform = `translateX(0px) scale(1)`;
    slides[currentSlide].style.opacity = "1";
}

moveSlides();

rightButton.addEventListener("click", () => {
    currentSlide++;
    //If the currentSlide is the penultimate then move the first slide to the end
    if (currentSlide != slidesCount - 2) return;

    let slideToMove = slides[0];
    slideToMove.classList.add("hidden");
    slides.push(slideToMove);
    slides.shift();
    setTimeout(() => slideToMove.classList.remove("hidden"), 0.1 * 1000);
    currentSlide--;
    //Translate slides by 1 position
    moveSlides();
});

leftButton.addEventListener("click", () => {
    currentSlide--;
    //If the currentSlide is the second then move the last slide to the start
    if (currentSlide != 1) return;

    let slideToMove = slides[slidesCount - 1];
    slideToMove.classList.add("hidden");
    slides.unshift(slideToMove);
    slides.pop();
    setTimeout(() => slideToMove.classList.remove("hidden"), 0.1 * 1000);
    currentSlide++;
    //Translate slides by 1 position
    moveSlides();
});

//Email
let form = document.querySelector("form");
let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let messageInput = document.querySelector("#messageInput");

let validData = function (...data) {
    return data.every(inputData => inputData != "");
}

let clearInputs = function (...inputs) {
    inputs.forEach(input => input.value = "");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Bootstrap validation
    if (!form.checkValidity()) form.classList.add('was-validated');

    //My validation
    let name = nameInput.value;
    let email = emailInput.value;
    let message = messageInput.value;

    let templateParams = {
        to_name: "Anouar",
        from_name: name,
        from_email: email,
        message
    }

    if (!validData(name, email, message)) return; a

    emailjs.send("service_ag7wub4", "template_ti29aa8", templateParams, "fYcNNf5Gm_tJkYQIc")
        .then(response => console.log(response))
        .catch(err => console.log(err))

    //Clear inputs
    clearInputs(nameInput, emailInput, messageInput);
});
