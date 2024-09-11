//listing element
document.getElementById('resumeform')?.addEventListener('submit', function(event){
    event.preventDefault();   

    



  const  ProfilePictureInput = document.getElementById('ProfilePicture') as HTMLInputElement;

   //type assertion
   const nameElement  = document.getElementById('name') as HTMLInputElement;
   const emailElement  = document.getElementById('email') as HTMLInputElement;
   const phoneElement  = document.getElementById('phone') as HTMLInputElement;
   const educationElement  = document.getElementById('education') as HTMLInputElement;
   const experienceElement  = document.getElementById('experience') as HTMLInputElement;
   const skillsElement  = document.getElementById('skills') as HTMLInputElement;






    if  (ProfilePictureInput && nameElement && emailElement && phoneElement && educationElement &&
         experienceElement && skillsElement){
     
     //*...........*/

    const name = nameElement.value;
    const  email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills= skillsElement.value; 
         
//*..............*/

   
// PICTURE ELEMENT
const ProfilePictureFile = ProfilePictureInput.files?.[0]
const ProfilePictureURL = ProfilePictureFile ? URL. createObjectURL(ProfilePictureFile) : '';


   //for resume output
   const ResumeOutput = `
   
   <h2>Resume</h2>
   ${ProfilePictureURL  ? `<img src="${ProfilePictureURL} alt="Profile Picture" class="ProfilePicture">` : '' }

   <p><strong>Name:</strong> <span id."edit-name" class."editable"> ${name} </span> </p>
   <p><strong>Email:</strong> <span id."edit-email" class."editable"> ${email} </span> </p>
   <p><strong>Phone Number:</strong> <span id."edit-phone" class."editable"> ${phone} </span> </p>


   <h3>Education</h3>
   <p id."edit-education" class."editable">${education}</p>

   <h3>Experience</h3>
   <p id."edit-experience" class."editable">${experience}</p>

   <h3>Skills</h3>
   <p id."edit-skills" class."editable">${skills}</p>

   `;


   //********************* */

     // Display the resume output
      const ResumeOutputElement = document.getElementById( 'ResumeOutput')
      if (ResumeOutputElement){
       ResumeOutputElement.innerHTML = ResumeOutput;
       ResumeOutputElement.classList.remove("hidden");


       // create container for buttons
       const buttonContainer = document.createElement("div");
       buttonContainer.id = "buttonContainer";
       ResumeOutputElement.appendChild(buttonContainer);

       // add download pdf button
         
       const downloadButton = document.createElement("button");
       downloadButton.textContent = "Download as PDF";
       downloadButton.addEventListener("click", ()  => { 
         window.print(); //open the print dialogue, allowing the user to save as PDF.
       });
       buttonContainer.appendChild(downloadButton);


       // add sharable link button
       const shareLinkButton = document.createElement("button");
       shareLinkButton.textContent = "Copy Shareable Link";
       shareLinkButton.addEventListener ("click" , async() =>  {
        try {
            //create a unique shareable link (simulate it in this case)
            const shareablelink = `https://yourdomain.com/resumes/${name.replace(
                /\s+/g,
                "_"
            
         )}_cv.html`; 

         //USE clipboard API to copy the shareable link
         await navigator.clipboard.writeText(shareablelink);
         alert("Shareable link copied to clipboard!");
    
        } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard.Please try again.");
        }
    });
     buttonContainer.appendChild(shareLinkButton);
 }else {
        console.error('The resume output elements are mising')
      }
      


    }

} );


function makeEditable() {
 const editableElements = document.querySelectorAll('editable');
 editableElements.forEach(element => {
   element.addEventListener('click' , function(){
    const currentElement = element as HTMLElement;
    const currentValue  = currentElement.textContent || "" ;

    //replace content
     if(currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
       const input = document.createElement('input')
       input.type = 'text'
       input.value = currentValue
       input.classList.add('editing-input')


        input.addEventListener('blur', function (){
          currentElement.textContent = input.value;
          currentElement.style.display = 'inline'
          input.remove()
        } )



       currentElement.style.display = 'none'
       currentElement.parentNode?.insertBefore(input, currentElement)
       input.focus()
     }

   })
 }

 )
 } 

