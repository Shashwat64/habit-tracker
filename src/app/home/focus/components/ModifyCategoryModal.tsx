import { useState, useEffect, SubmitEvent } from "react"


import { X } from "lucide-react" 

import type { FocusCategories } from "@/src/types/types";

import { addFocusCategory, editFocusCategory} from "@/src/app/actions/focus";

type CategoryColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "purple"
  | "pink"
  | "brown"
  | "gray";

type ModifyCategoryModalProps = {
  setIsCategoryOpen:React.Dispatch<React.SetStateAction<boolean>>
  categoryInfo?:FocusCategories
}

export default function ModifyCategoryModal({setIsCategoryOpen, categoryInfo}:ModifyCategoryModalProps){

  let isEdit: boolean = false
  if(categoryInfo?.id){
    isEdit = true
  }
  const [selectedColor, setSelectedColor] = useState<CategoryColor>((categoryInfo?.color as CategoryColor) ?? "red")

    const [formData, setFormData] = useState({
      name: categoryInfo?.name ||  "",
      color: categoryInfo?.color || selectedColor,
    });



    const colors:CategoryColor[] = ["red","orange","yellow","green","cyan","blue","purple","pink","brown","gray"];

    console.log("selectedColor is", selectedColor)

    const categoryColors = {
      red: "#ef4444",
      orange: "#f97316",
      yellow: "#eab308",
      green: "#22c55e",
      cyan: "#06b6d4",
      blue: "#3b82f6",
      purple: "#8b5cf6",
      pink: "#ec4899",
      brown: "#a16207",
      gray: "#6b7280",
    };

    function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
      const { name, value } = e.target;

      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
      e.preventDefault()

      const formData = new FormData(e.currentTarget)

      const data = {
        name: formData.get("name") as string,
        color: selectedColor as CategoryColor,
      }

      console.log("Data in Modal is ", data)

      if(categoryInfo?.id){
        await editFocusCategory(data, categoryInfo?.id)
      }else{
        await addFocusCategory(data)
      }
      
      setIsCategoryOpen(false)
    }



  return(
    <section className="fixed inset-0 bg-black/60 z-10 flex items-center justify-evenly" onClick={e=>(setIsCategoryOpen(false))}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative min-h-100 flex flex-col w-120 bg-background rounded-xl p-6 z-50 border border-border"
      >
        <X 
              className="absolute right-4 rounded-md hover:bg-red-400"
              onClick={e=>(setIsCategoryOpen(false))}
            />
        <h2 className="text-lg font-bold">{isEdit ? "Edit" : "Add"} Category</h2>
        <h3 className="text-sm text-secondary">{isEdit ? "Update the name or color of this category." : "Create a new category to organize your habits."}</h3>
        <form onSubmit={handleSubmit} className="mt-8 flex-1 flex flex-col gap-10">
          <label >
            Category Name
            <input 
              type="text" 
              name="name"
              className="w-full h-12 rounded-lg bg-input mt-2 px-4"
              placeholder="Enter Category Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <div>
            <h2 className="text-lg font-bold mb-2">Category Color</h2>
            <h3 className="text-sm text-secondary mb-5">
              Choose a color to easily identify this category.
            </h3>

            <div className="flex gap-5">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`
                    h-6 w-6 rounded-full cursor-pointer
                    ${selectedColor === color
                      ? "ring-2 ring-offset-2 ring-white"
                      : ""}
                  `}
                  style={{ backgroundColor: categoryColors[color] }}
                />
              ))}
            </div>
          </div>

           <button className="self-end bg-primary px-4 py-2 rounded-lg">{isEdit ? "Edit" : "Add"} Category</button>
        
        </form>
      </div>
    </section>
  )
}