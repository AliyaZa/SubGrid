
   // debugger
    $(document).ready(function () {
        $("#jqGrid").jqGrid({
            url: 'https://api.github.com/users/geerlingguy/repos',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { label: 'ID', name: 'id', key: true, width: 75 },
                { label: 'node_id', name: 'node_id', width: 150 },
                { label: 'name', name: 'name', width: 150 },
                { label: 'full_name', name: 'full_name', width: 150 },
                { label: 'private', name: 'private', width: 150 }
            ],
        loadonce: true,
        width: 780,
        height: 250,
        rowNum: 10,
        rowList:[10,20,30],
        //sortname: 'owner',
        subGrid: true,
        subGridRowExpanded: showChildGrid,
        subGridOptions:
        {expandOnLoad: true},
        pager: "#jqGridPager"
    });
});


// the event handler on expanding parent row receives two parameters
// the ID of the grid tow  and the primary key of the row
function showChildGrid(parentRowID, parentRowKey) {
    // create unique table and pager
    var childGridID = parentRowID + "_table";
    var childGridPagerID = parentRowID + "_pager";

    // send the parent row primary key to the server so that we know which grid to show
    var childGridURL = 'https://api.github.com/users/geerlingguy/repos'+"login";/*parentRowKey +".json";*/
    // add a table and pager HTML elements to the parent grid row - we will render the child grid here
    $('#' + parentRowID).append('<table id=' + childGridID + '></table><div id=' + childGridPagerID + '></div>');

    $("#" + childGridID).jqGrid({
        url: childGridURL,
        mtype: "GET",
        datatype: "json",
        page: 1,
        colModel: [
            { label: 'login', name: 'login', key: true, width: 180 },
            { label: 'type', name: 'type', width: 190 },
            { label: 'url', name: 'url', width: 190 },
        ],
        loadonce: true,
        width: 500,
        height: '100%',
        rowNum:20,
        pager: "#" + childGridPagerID
    });
}
