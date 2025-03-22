import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Skills from "./Skills/Skills";
import PersonalDetailsPreview from "./PersonalDetails/PersonalDetailsPreview";
import EducationPreview from "./Education/EducationPreview";
import ExperiencePreview from "./Experience/ExperiencePreview";
import SkillsPreview from "./Skills/SkillsPreview";

export default function Parent() {
  const divRef = useRef(null);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.id]: e.target.value });
  };

  // First element is the empty entry
  const [educationHistory, setEducationHistory] = useState([
    {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ]);

  // New education form state
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const [isEditingEducation, setIsEditingEducation] = useState(false);

  const handleEducationChange = (e) => {
    const { id, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [id]: value }));
  };

  const addEducation = () => {
    setEducationHistory([...educationHistory, newEducation]);
    // Reset the form state after saving
    setNewEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setIsEditingEducation(false);
  };

  const removeEducation = (index) => {
    setEducationHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelEdit = () => {
    setNewEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setIsEditingEducation(false);
  };

  const [experienceHistory, setExperienceHistory] = useState([
    {
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    },
  ]);

  const [newExperience, setNewExperience] = useState({
    companyName: "",
    positionTitle: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const [isEditingExperience, setIsEditingExperience] = useState(false);

  const handleExperienceChange = (e) => {
    const { id, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [id]: value }));
  };

  const addExperience = () => {
    setExperienceHistory([...experienceHistory, newExperience]);
    setNewExperience({
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setIsEditingExperience(false);
  };

  const removeExperience = (index) => {
    setExperienceHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelExperienceEdit = () => {
    setNewExperience({
      companyName: "",
      positionTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setIsEditingExperience(false);
  };

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditingSkill, setIsEditingSkill] = useState(false);

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const addSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill("");
    setIsEditingSkill(false);
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const cancelSkillEdit = () => {
    setNewSkill("");
    setIsEditingSkill(false);
  };

  const handleDownloadPDF = async () => {
    console.log("Downloading PDF...");

    if (!divRef.current) {
      console.error("No element found for divRef");
      return;
    }

    try {
      // Create a clone of the element to modify before rendering
      const clone = divRef.current.cloneNode(true);
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(clone);
      document.body.appendChild(tempDiv);

      // Replace problematic oklch colors with fallback colors
      const elementsWithStyle = tempDiv.querySelectorAll("*");
      elementsWithStyle.forEach((el) => {
        const style = window.getComputedStyle(el);
        // Apply fallback colors for any element that might use oklch
        if (
          style.color.includes("oklch") ||
          style.backgroundColor.includes("oklch") ||
          style.borderColor.includes("oklch")
        ) {
          // Replace with fallback colors
          el.style.color = "#000000"; // Black fallback for text
          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff"; // White fallback for backgrounds
          }
          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "#cccccc"; // Gray fallback for borders
          }
        }
      });

      // Generate canvas from the modified clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
      });

      // Remove the temporary element
      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);
    }
  };

  return (
    <div className="relative flex">
      <div>
        <PersonalDetails
          formData={personalDetails}
          onChange={handlePersonalDetailsChange}
        />
        <Education
          educationList={educationHistory}
          newEducation={newEducation}
          isEditingEducation={isEditingEducation}
          onChange={handleEducationChange}
          onAdd={() => setIsEditingEducation(true)}
          onRemove={removeEducation}
          onSave={addEducation}
          onCancel={cancelEdit}
        />
        <Experience
          experienceList={experienceHistory}
          newExperience={newExperience}
          isEditingExperience={isEditingExperience}
          onChange={handleExperienceChange}
          onAdd={() => setIsEditingExperience(true)}
          onRemove={removeExperience}
          onSave={addExperience}
          onCancel={cancelExperienceEdit}
        />
        <Skills
          skillsList={skills}
          newSkill={newSkill}
          isEditingSkill={isEditingSkill}
          onChange={handleSkillChange}
          onAdd={() => setIsEditingSkill(true)}
          onRemove={removeSkill}
          onSave={addSkill}
          onCancel={cancelSkillEdit}
        />
      </div>
      <div
        ref={divRef}
        className="m-10 ml-5 block min-h-[297mm] w-full max-w-sm min-w-[210mm] justify-evenly border border-gray-200 bg-white px-6 shadow-sm"
      >
        <PersonalDetailsPreview formData={personalDetails} />
        <hr className="solid" />
        <h2 className="m-2 text-base font-semibold text-gray-700 italic underline">
          Education
        </h2>
        {[
          ...educationHistory.slice(1),
          isEditingEducation ? newEducation : null,
        ].map(
          (edu, index) =>
            edu && <EducationPreview key={index} formData={edu} />,
        )}
        <hr className="solid mt-6" />
        <h2 className="m-2 text-base font-semibold text-gray-700 italic underline">
          Professional Experience
        </h2>
        {[
          ...experienceHistory.slice(1),
          isEditingExperience ? newExperience : null,
        ].map(
          (exp, index) =>
            exp && <ExperiencePreview key={index} formData={exp} />,
        )}
        <hr className="solid mt-6" />
        <h2 className="m-2 text-base font-semibold text-gray-700 italic underline">
          Relevant Skills
        </h2>
        <SkillsPreview skillsList={skills} />
      </div>
      <button
        onClick={handleDownloadPDF}
        className="fixed bottom-0 right-0 m-4 rounded bg-sky-900 px-4 py-2 text-white shadow hover:bg-sky-700"
      >
        Download as PDF
      </button>
    </div>
  );
}
