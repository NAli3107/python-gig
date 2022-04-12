const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const technologies = document.querySelector("#technologies").value.trim();
  const description = document.querySelector("#description").value.trim();
  const budget = document.querySelector("#budget").value.trim();
  const contact_email = document.querySelector("#contactEmail").value.trim();

  if (title && technologies && description && budget && contact_email) {
    const response = await fetch(`/api/gigs/newAdd`, {
      method: "POST",
      body: JSON.stringify({
        title,
        technologies,
        description,
        budget,
        contact_email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create project");
    }
  }
};

document.querySelector(".add-gigs").addEventListener("submit", newFormHandler);
