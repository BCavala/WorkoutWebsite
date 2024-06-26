document.querySelectorAll(".muscle-groups svg g g[id]").forEach(function (group) {
  // For the hover
  group.addEventListener('mouseover', function (el) {
    let id = el.target.closest('g[id]').id.toLowerCase();
    let label = document.querySelector(`label[for="${id}"]`);
    if (label.classList) {
      label.classList.add("hover");
    } else {
      label.className += ' ' + "hover";
    }
  });

  group.addEventListener('mouseout', function (el) {
    let id = el.target.closest('g[id]').id.toLowerCase();
    let label = document.querySelector(`label[for="${id}"]`);
    if (label.classList) {
      label.classList.remove("hover");
    } else {
      label.className = label.className.replace(new RegExp('(^|\\b)hover(\\b|$)', 'gi'), ' ');
    }
  });

  // For the click
  group.addEventListener('click', function (el) {
    let id = el.target.closest('g[id]').id.toLowerCase();
    let input = document.getElementById(id);

    if (!input) {
      console.error(`No checkbox found for id: ${id}`);
      return;
    }

    // Uncheck all other checkboxes
    document.querySelectorAll('.muscles-helper').forEach(cb => {
      if (cb !== input) {
        cb.checked = false;
      }
    });

    // Toggle the clicked checkbox
    input.checked = !input.checked;

    // Load workouts for the selected muscle group
    const selectedMuscle = input.nextElementSibling.textContent.trim();
    window.loadWorkoutsForMuscle(selectedMuscle);
  });
});
