<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>VidNote</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="VidCSS.css">
    </head>
    <body>
        <div id="wrapper">
        <div class="left_container">    
            <div>
                <form name="urlForm" method="post">
                    <p>
                        <label for='name' id="url_label">URL</label>
                        <input type='text' name='url' size="80" id='url'/>  
                        <button type="button" id="urlclick">GO</button>
                    </p>
                </form>
            </div>

            <div id="player"></div>

            <div>
                <form name="noteForm" method="post">

                    <p>
                     <p><label for='name'><b>Your annotation</b></label></p>
                    <textarea name='note' cols='83' rows='5' id='noteArea'></textarea><br> 
                    <button type="button" id="annotate" >Annotate</button>
                    </p>
                </form>
            </div>
        </div>  
        
        <div class="right_container">
            <p id ="canvas">
            <div id="times"></div>
            <div id="notes"></div>
            </p>
            
        </div>
        </div>    
        <script type="text/javascript" src="VidNote.js"></script>
    </body>
</html>


