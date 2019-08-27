searchParams = new URLSearchParams(window.location.search)

if (searchParams.get('fcc-test') === 'true') {
    const script = document.createElement('script');
    script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
    
    document.body.appendChild(script);
}
