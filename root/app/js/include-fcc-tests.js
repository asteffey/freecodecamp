function hasFccTest() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('fcc-test') === 'true';
}

if (hasFccTest()) {
    const script = document.createElement('script');
    script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
    
    document.body.appendChild(script);
}