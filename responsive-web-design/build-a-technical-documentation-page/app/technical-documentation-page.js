const searchParams = new URLSearchParams(window.location.search);
if (searchParams.get('fcc-test') === 'true') {
    document.querySelector("nav>header").classList.add("with-fcc-test");
}