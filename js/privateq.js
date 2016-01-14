 
 
function display_c(){ var refresh=300; // Refresh rate in milli seconds
	mytime=setTimeout('display_ct()',refresh); // when .. <body onload="display_ct()">
}

function display_ct() {
	//var strcount;
	var x = new Date();
	document.getElementById('wizardElement').innerHTML = x.getUTCSeconds()	;
	tt=display_c();
}
function base16to32of64(hh){
	return 	 parseInt(hh.slice(0,8),16).toString(32).toUpperCase()+
			 parseInt(hh.slice(8,16),16).toString(32).toUpperCase()+
 			 parseInt(hh.slice(16,24),16).toString(32).toUpperCase()+ 			 
			 parseInt(hh.slice(24,32),16).toString(32).toUpperCase()+
			 parseInt(hh.slice(32,40),16).toString(32).toUpperCase()+
			 parseInt(hh.slice(40,48),16).toString(32).toUpperCase()+
			 parseInt(hh.slice(48,56),16).toString(32).toUpperCase()+			 			 
 			 parseInt(hh.slice(56,64),16).toString(32).toUpperCase() ;	
	}
	
	function SHA256in32(data){
return	base16to32of64(CryptoJS.SHA256(data).toString());
}
 function hash(data){
	     if ( document.getElementById("ToHash").checked){
			var //hh=CryptoJS.SHA256(data).toString();
			h=SHA256in32(data);
			//base16to32of64(CryptoJS.SHA256(data).toString());// 7/8 bases : hh in  16 -> h in 32
		 
			 window.hname+=h;
			// document.getElementById('ioput').value= h;//h;//str.toUpperCase();
	 }

	
	 }
 function EditContent(data){  
//	 var buffer = new ArrayBuffer(12);
//var dataView = new DataView(buffer);
//var str =ab2str(data); 
//new Uint8Array(data);
//var str = data.toString();
//String.fromCharCode.apply(null, new Uint16Array(data));


	 document.getElementById('ioput').value=data;//str;//window.content;//data;
	 }

 //----------------------ViewTable
// $(".container-fluid .var_app").html(); // Using the jQuery library 
 function init_table(data) {// Thanks to Derek Eder under mit: Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	// data=ab2str(data);
  var options={
   //     csv_path: 'fatty_acid_profiles.csv',
        element: 'table-container', 
    //    allow_download: true,
        csv_options: {separator: ',', delimiter: '"'},
        datatables_options: {"paging": true}//false}
      };
  options = options || {};
 // var csv_path = options.csv_path || "";
  var el = options.element || "table-container";
  var allow_download = options.allow_download || false;
  var csv_options = options.csv_options || {};
  var datatables_options = options.datatables_options || {};

  $("#" + el).html("<table class='table table-striped table-condensed' id='my-table'></table>");

  //$.when($.get(csv_path)).then(function(data){

      data = data.replace(/[\r|\r\n]/g, "\n");
      
      var csv_data = $.csv.toArrays(data, csv_options);

      var table_head = "<thead><tr>";

      for (head_id = 0; head_id < csv_data[0].length; head_id++) { 
        table_head += "<th>" + csv_data[0][head_id] + "</th>";
      }

      table_head += "</tr></thead>";
      $('#my-table').append(table_head);
      $('#my-table').append("<tbody></tbody>");

      for (row_id = 1; row_id < csv_data.length; row_id++) { 
        var row_html = "<tr>";

          for (col_id = 0; col_id < csv_data[row_id].length; col_id++) { 
            row_html += "<td>" + csv_data[row_id][col_id] + "</td>";
          }
          
        row_html += "</tr>";
        $('#my-table tbody').append(row_html);
      }

      $("#my-table").DataTable(datatables_options);
	  document.getElementById('ioput').value=null;
     // if (allow_download) $("#" + el).append("<p><a class='btn btn-info' href='" + csv_path + "'><i class='glyphicon glyphicon-download'></i> Download as CSV</a></p>");
    //    });
}
///
function clearvar(){ // why it is not worling?
	  window.content=null;
	 // window.Scontent="";
	 
    window.hname=null;
    document.getElementById('ioput').value= "";//null;   // document.getElementById('harea').value= null;
	init_table(window.content);}
//---------------------------OpenFile 
  //http://www.html5rocks.com/en/tutorials/file/dndfiles/
  var reader;
  var progress = document.querySelector('.percent');
  function abortRead() {
    reader.abort();
  }

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt) {
    
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      } //else if (percentLoaded == 100){}
		  
    }

  }

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';
 
    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
		
	  window.content	   = this.result;
	  hash(window.content);
	  		// Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';          
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
     
    }
    if ( document.getElementById("AsText").checked){
           reader.readAsBinaryString(evt.target.files[0]);// Read in the image file as a binary string.
    }else{ reader.readAsArrayBuffer(evt.target.files[0]);}// Read in the image file as a binary string.
//var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
// if etc == csv , call table
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
//--------------------------savefile
function savefile(fileName){ // saveas http://stackoverflow.com/questions/28263221/save-html-textarea-state
//var ToWrite =window.content ; //document.getElementById('ioput').value;
    var blobas = new Blob([window.content]);//[ToWrite]);//, {type:'text/plain'});
    var saveas = document.createElement("a");
    saveas.download = fileName;
    saveas.innerHTML = "Download File";
    if (window.webkitURL != null){        // Chrome allows the link to be clicked without actually adding it to the DOM.
        saveas.href = window.webkitURL.createObjectURL(blobas);
    }    else    {        // Firefox requires the link to be added to the DOM before it can be clicked.
        saveas.href = window.URL.createObjectURL(blobas);
        saveas.onclick = destroyClickedElement;
        saveas.style.display = "none";
        document.body.appendChild(saveas);
    }

    saveas.click();
}
/* var extension = file.substr( (file.lastIndexOf('.') +1) );
    switch(extension) {
        case 'jpg':
        case 'png':
        case 'gif':
            alert('was jpg png gif');  // There's was a typo in the example where
        break;                         // the alert ended with pdf instead of gif.
        case 'zip':
        case 'rar':
            alert('was zip rar');
        break;
        case 'pdf':
            alert('was pdf');
        break;
        default:
            alert('who knows');
    }*/
function destroyClickedElement(event){    document.body.removeChild(event.target);}
