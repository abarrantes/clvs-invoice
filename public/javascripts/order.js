
const ItemsArray = [];

$(document).ready(() => {


    var nextID = 0;

    function calculateNextID() {
        nextID += 1;
        return nextID;
    }

    $(document).on("click","button.btnAddLIne" , function() {
        addLineHtml(calculateNextID(), $(this));
    });

    $(document).on("click","button.btnDeleteLine" , function() {
        deleteLineHtml($(this));
        calculateLineTotal();
        calculateDocTotal();
    });

    $(document).on("blur",".calcTriger",function(){
        calculateLineTotal();
        calculateDocTotal();
    })

    function calculateLineTotal() {

        $.each($(".orderLines"), function (index, line) {

            let quantity = $(this).find($("input[name='itemQuantity']")).val();
            let price = $(this).find($("input[name='itemPrice']")).val();
            
            $(this).find($("input[name='lineTotal']")).val(
                quantity * price
            )
        });
    }

    function calculateDocTotal() {

        let docTotal = 0;

        $.each($(".orderLines"), function (index, line) {
            docTotal += Number($(this).find($("input[name='lineTotal']")).val());
        });

        $("#total").val(docTotal);
        $("#numberOfLines").val($('.orderLines').length);
    }

    function deleteLineHtml(clickedBtn) {
        if ($('.orderLines').length === 1) {
            alert("the order needs at least one line");
            return;
        }
        clickedBtn.parent().parent().prev().remove();
        clickedBtn.parent().parent().remove();
    }

    //NOT USING THIS. ITS FOR TESTS. 
    // $(document).on("click","button.btnTestApi" , function() {
    //     getItems();
    // });

     
    $(document).on("mouseenter",".itemDropdown",function(){
        fillItems($(this));
    })
    
    function fillItems($selectNode){
        axios.get('/api/items')
        .then((response)=>{
            ItemsArray.splice(0)
            response.data.forEach(element => {
                ItemsArray.push(element);
            });
            $selectNode.children().remove();
            ItemsArray.forEach(element => {
                
                $selectNode.append(`<option>${element.itemCode}</option>`);
            });
        })
        .catch((err)=>{
            console.log("error en getItems",err);
        })
    }

    function addLineHtml(id, clickedBtn) {

        let line =
            `<hr>
        <div id="${id}" class="d-flex justify-content-between orderLines">
        
        <div>
        <select class="form-control itemDropdown" id="itemCode${id}" name="itemCode">
        <option></option>
        </select>
        </div>
        <div>
        <input type="text" class="form-control" id="itemName${id}" name="itemName" placeholder="itemName">
        </div>
        <div>
        <input type="number" class="form-control calcTriger" id="itemQuantity${id}" name="itemQuantity" value="0">
        </div>
        <div>
        <input type="number" class="form-control calcTriger" id="itemPrice${id}" name="itemPrice" value="0">
        </div>
        <div>
        <input type="number" class="form-control" id="lineTotal${id}" name="lineTotal" readonly="readonly" value="0">
        </div>
        <div>
        <button type="button" class="btn btn-success btn-sm btnAddLIne">+${id}</button>
        <button type="button" class="btn btn-danger btn-sm btnDeleteLine">-${id}</button>
        </div>
        
        </div>
        `

        clickedBtn.parent().parent().after(line);
    };

});