import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import Button from "../Button";
import SkillsForm from "./SkillsForm";
export default function Skills() {
  const [collapsed, setCollapsed] = useState(true);
  const [formOpen, setFormOpen] = useState(true);
  return (
    <div className="m-10 block w-full max-w-sm min-w-[475px] justify-evenly rounded-lg border border-gray-200 bg-white px-6 shadow-sm">
      <button
        className={`flex h-[50px] w-full items-center justify-between transition-all duration-300 ease-in-out ${collapsed ? "rounded-xl" : "rounded-t-xl"}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center justify-center space-x-2">
          <FaLightbulb size="1.3em" />
          <h3 className="font-semibold text-lg">Skills</h3>
        </div>
        <MdArrowBackIosNew
          className={`text-sm transition-transform duration-300 ${collapsed ? "rotate-90" : "-rotate-90"}`}
        />
      </button>
      <div
        className={`flex w-full items-center justify-center rounded-b-xl transition-all duration-300 ease-in-out ${collapsed ? "h-0" : "min-h-[75px]"}`}
      >
        {!collapsed && formOpen && (
          <Button buttonText="+ Skill" onClick={() => setFormOpen(!formOpen)} />
        )}
        {!collapsed && !formOpen && <SkillsForm />}
      </div>
    </div>
  );
}
