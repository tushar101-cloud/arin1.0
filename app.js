document.addEventListener('DOMContentLoaded', () => {
    const startNavBtn = document.getElementById('start-navigation');
    const stopNavBtn = document.getElementById('stop-navigation');
    const positionDisplay = document.getElementById('position');
    let watchID;

    // Start navigation (track user position)
    startNavBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    positionDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
                },
                (error) => console.error('Error getting position', error),
                { enableHighAccuracy: true }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });

    // Stop navigation (stop tracking position)
    stopNavBtn.addEventListener('click', () => {
        if (watchID) {
            navigator.geolocation.clearWatch(watchID);
            positionDisplay.textContent = '';
        }
    });

    // Admin login
    const adminForm = document.getElementById('admin-form');
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();
            if (result.success) {
                document.getElementById('location-form').style.display = 'block';
                alert('Admin logged in successfully');
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.error('Login error', err);
        }
    });

    // Add new location
    const addLocationForm = document.getElementById('add-location');
    addLocationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const locationName = document.getElementById('location-name').value;
        const coordinates = document.getElementById('coordinates').value;

        try {
            const response = await fetch('/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ locationName, coordinates }),
            });
            const result = await response.json();
            if (result.success) {
                alert('Location added successfully');
            } else {
                alert('Error adding location');
            }
        } catch (err) {
            console.error('Error adding location', err);
        }
    });
});
