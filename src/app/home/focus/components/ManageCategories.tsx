
import { Divide, X } from "lucide-react"

import { useState } from "react";

import type { FocusCategories } from "@/src/types/types";

import { deleteFocusCategory, archivedFocusCategory, unarchivedFocusCategory } from "@/src/app/actions/focus";

import ModifyCategoryModal from "./ModifyCategoryModal";

type ManageCategoriesProps ={
  setIsManageCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>
  categories:FocusCategories[]
}

type CategoryCard = {
  setIsCategoryOpen:React.Dispatch<React.SetStateAction<boolean>>
  setEditId:React.Dispatch<React.SetStateAction<number|null>>
  cate:FocusCategories
  i:number
}

const CategoryCard = ({cate, i, setIsCategoryOpen, setEditId}:CategoryCard)=>(
  <div key={i} className="flex justify-between px-2 py-1 items-center">
    <p>
      {cate.name}
    </p>
    <div className="flex py-1">
      <button
        className="w-full px-4 py-2 text-left text-sm text-white hover:bg-card-hover active:bg-card-active transition-colors cursor-pointer"
        onClick={()=>{
          setEditId(cate.id as number)
          setIsCategoryOpen(true)}
        }
      >
        Edit
      </button>

      <button
        className="w-full px-4 py-2 text-left text-sm text-white hover:bg-card-hover active:bg-card-active transition-colors cursor-pointer"
        onClick={()=>{
          if(cate.isArchived){
            unarchivedFocusCategory(cate.id) 
          }else{
            archivedFocusCategory(cate.id)
          }
        }}
      >
        {cate.isArchived ? "Unachieve" : "Achieve"}
      </button>

      <button
        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 active:bg-red-500/20 transition-colors cursor-pointer"
        onClick={()=>{deleteFocusCategory(cate.id)}}
      >
        Delete
      </button>
    </div>
  </div>
)

export default function ManageCategories({setIsManageCategoryOpen, categories}:ManageCategoriesProps){

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false) //make this false
  const [editId, setEditId] = useState<number|null>(null) //make this false

  const archivedCategories = categories.filter(cate=>cate.isArchived)
  const notArchivedCategories = categories.filter(cate=>!cate.isArchived)

  return(
    <section className="fixed inset-0 bg-black/60 z-10 flex items-center justify-evenly"        
      onClick={e=>(setIsManageCategoryOpen(false))}>
        {isCategoryOpen && <ModifyCategoryModal setIsCategoryOpen={setIsCategoryOpen} categoryInfo={categories.find(cate=>cate.id === editId)} />}
      <div 
        onClick={(e) => e.stopPropagation()}
          className="relative min-h-100 max-h-[80vh] overflow-y-auto flex flex-col w-120 bg-background rounded-xl p-6 z-10 border border-border"

      >
        <X 
          className="absolute right-4 rounded-md hover:bg-red-400"
          onClick={e=>(setIsManageCategoryOpen(false))}
        />

        <h2 className="text-lg font-bold mb-5">Manage Categories</h2>

        <div className="flex flex-col flex-1 justify-between">
          {notArchivedCategories?.length == 0 && <div>
              <p className="text-center">No category to show</p>
          </div> }
          <div>
            {notArchivedCategories.map((cate, i)=>(
              <CategoryCard cate={cate} i={i} key={i} setIsCategoryOpen={setIsCategoryOpen} setEditId={setEditId}/> 
            ))} 
          </div>
            {archivedCategories?.length > 0 && 
              <div className="mt-5">
                <h3 className="text-center">Archived Categories</h3>
                {archivedCategories.map((cate, i)=>(
                  <CategoryCard cate={cate} i={i} key={i} setIsCategoryOpen={setIsCategoryOpen} setEditId={setEditId}/> 
                ))}        
              </div>
            }
        </div>
      </div>

    </section>
  )
}