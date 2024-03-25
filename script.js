// I am Zekrom,my NCC id is 223190727
// Ask the user if they need help  
const needsHelp = confirm("Do you need help to calculate the average score?");  
  
  if (needsHelp) {  
// If you need help, prompt the user to enter their full name  
    const fullName = prompt("Please enter your full name:");  
    
// Initialize score array  
    const grades = [];  
    
// Loop prompts for users to enter scores for four units  
    for (let i = 1; i <= 4; i++) {  
      const grade = parseFloat(prompt(`Please enter the grade for unit ${i}`));  
      if (isNaN(grade)) {  
        alert(`Please enter a valid grade for unit ${i}！`);  
        i--; // If the input is invalid, re-enter the grade for that unit 
      } else {  
        grades.push(grade); // If the input is valid, add the grade to the array  
      }  
    }  
    
    // Calculate total and average scores  
    const totalScore = grades.reduce((sum, grade) => sum + grade, 0);  
    const averageScore = totalScore / grades.length;  
    
    // Output total score and average score 
    console.log(`Your total score is：${totalScore}`);  
    console.log(`Your average score is：${averageScore.toFixed(2)}`);  
    document.write(`Your total score is：${totalScore}Your average score is：${averageScore.toFixed(2)}`)
    // Thank you to the user for using this program  
    console.log(`Thank ${fullName}Use this program!`); 
    document.write(`Thank ${fullName}Use this program!`);
  } else {  
    // If the user does not need help, thank them directly  
    console.log("Thank you for using this program!");
    document.write("Thank you for using this program!");  
  }