import React from 'react'
import Skeleton from "react-loading-skeleton";


export default function TableSkeleton() {
  return (
     <div className="overflow-x-auto">
     <table className="table-auto w-full text-left border-collapse border border-gray-300">
       <thead>
         <tr>
           {Array(5)
             .fill(0)
             .map((_, index) => (
               <th
                 key={index}
                 className="px-4 py-2 border border-gray-300"
               >
                 <Skeleton width="100%" height="16px" />
               </th>
             ))}
         </tr>
       </thead>
       <tbody>
         {Array(8)
           .fill(0)
           .map((_, rowIndex) => (
             <tr key={rowIndex}>
               {Array(5)
                 .fill(0)
                 .map((_, colIndex) => (
                   <td
                     key={colIndex}
                     className="px-4 py-2 border border-gray-300"
                   >
                     <Skeleton width="100%" height="16px" />
                   </td>
                 ))}
             </tr>
           ))}
       </tbody>
     </table>
   </div>
  )
}
