export default function GetCategories(props) {
    return(
     <div className="categorySection">
       {props.array.map((category) => (
         <div className="categoryDisplay" key={category.id}>
           {category.name}
         </div>
       ))}
     </div>
    );
}