function applyStyles() {
    const input = document.getElementById('input').value;
    const preview = document.getElementById('preview');
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;

    document.querySelectorAll('.tag-control').forEach(control => {
        const tag = control.dataset.tag;
        const styles = [];

        if (control.querySelector('.color').value) {
            styles.push(`color: ${control.querySelector('.color').value}`);
        }
        if (control.querySelector('.font-size')?.value) {
            styles.push(`font-size: ${control.querySelector('.font-size').value}px`);
        }
        if (control.querySelector('.bold')?.checked) {
            styles.push('font-weight: bold');
        }
        if (control.querySelector('.italic')?.checked) {
            styles.push('font-style: italic');
        }
        if (control.querySelector('.underline-style')?.value) {
            styles.push(`text-decoration-style: ${control.querySelector('.underline-style').value}`);
        }
        if (control.querySelector('.custom-style')?.value) {
            styles.push(control.querySelector('.custom-style').value);
        }
        
        if (styles.length > 0) {
            tempDiv.querySelectorAll(tag).forEach(element => {
                element.style.cssText = styles.join('; ');
            });
        }
    });
    
    preview.innerHTML = tempDiv.innerHTML;
}

document.querySelectorAll('.tag-control').forEach(control => {
    control.querySelector('.color').value = '#000000';
    if (control.querySelector('.font-size')) {
        control.querySelector('.font-size').value = 16;
    }
});