document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.muscles-helper');
  const workoutList = document.getElementById('workoutList');
  const titleElement = document.getElementById('text-title');

  // Function to load workouts for a given muscle
  async function loadWorkoutsForMuscle(selectedMuscle) {
    workoutList.innerHTML = '';
    titleElement.textContent = '';

    titleElement.textContent = `Workouts for: ${selectedMuscle}`;

    try {
      const response = await fetch(`/exercises/${selectedMuscle}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      data.forEach(workout => {
        const listItem = document.createElement('li');
        listItem.textContent = workout.name;

        const videoLink = document.createElement('a');
        videoLink.href = workout.exerciseLink;
        videoLink.textContent = 'Watch on YouTube';

        listItem.appendChild(videoLink);

        workoutList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Uncheck all checkboxes except the one that triggered the event
      checkboxes.forEach(cb => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });

      let selectedMuscle = null;

      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedMuscle = checkbox.nextElementSibling.textContent.trim();
        }
      });

      if (selectedMuscle) {
        loadWorkoutsForMuscle(selectedMuscle);
      } else {
        workoutList.innerHTML = '';
        titleElement.textContent = 'Workouts for:';
      }
    });
  });

  // Export the function for external use
  window.loadWorkoutsForMuscle = loadWorkoutsForMuscle;
});
