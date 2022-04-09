const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const technologies = document.querySelector("#technologies").value.trim();
  const description = document.querySelector("#description").value.trim();
  const budget = document.querySelector("#budget").value.trim();
  const contactEmail = document.querySelector("#contactEmail").value.trim();

  if (title && technologies && description && budget && contactEmail) {
    const response = await fetch(`/add`, {
      method: "POST",
      body: JSON.stringify({
        title,
        technologies,
        description,
        budget,
        contactEmail,
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

document.querySelector(".addGigs").addEventListener("submit", newFormHandler);
