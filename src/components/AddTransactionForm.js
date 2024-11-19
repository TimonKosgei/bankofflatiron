import React from "react";

function AddTransactionForm({onNewTransaction}) {
  return (
    <div className="ui segment">
      <form className="ui form"   onSubmit={(e)=>{
            e.preventDefault()
            const formData= {
              date : e.target.date.value,
              description : e.target.description.value,
              category : e.target.category.value,
              amount : e.target.amount.value
            }
            fetch('http://localhost:8002/transactions',{
              method: "POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify(formData)
            })
            .then(res => {
              if(res.ok){  
                onNewTransaction(formData)
              }
              res.json()
              
            })
            .then(data => console.log(data))
            .catch(error => console.log(`Error: ${error}`))
        }}>
        <div className="inline fields">
          <input type="date" name="date" />
          <input type="text" name="description" placeholder="Description" />
          <input type="text" name="category" placeholder="Category" />
          <input type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
