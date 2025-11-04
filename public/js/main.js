// Simple nav toggles and tiny interactions (placeholder)
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers for CTA buttons if present
  document.querySelectorAll('.cta').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault();
      alert('CTA clicked — this is a placeholder action.');
    });
  });
});
