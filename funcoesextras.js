function ziparProjetos(){
    var projeto_url = $("#projeto_url").val();
    var projeto_id = $("#projeto_id").val();
    var popup = ` <section id="gameOver">
        <div id="id_block">
            
            <p>O Projeto é inserção?</p>
            <div class="flexbox"> 
                <button class="btn btn-yes" style="margin-right: 12px"> Sim </button>
                 <button class="btn btn-no"> Não </button> 
             </div>
           

        </div>
    </section>`; 



    $('body').append(popup);
    $('.form-body').append('<button class="zip btn btn-success btn-large" value="teste">Zip</button>');
    $('.zip').css('position', 'relative');
    $('.zip').css('right', '15px');
    $('.zip').css('float', 'right');



    $(document).on('click', '.zip', function (e) { 

        e.preventDefault();
        $('#gameOver').css('display', 'flex'); 
            $(document).on('click', '.btn-no', function(){
                let okay = null;

                $('#gameOver').css('display', 'none'); 
                $('.zip').text('Compactando...');
                    $.ajax({
                        url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/zipador.php', 
                        type: 'POST',
                        data: {id: projeto_id, ok: okay}, 
                        dataType: 'json',
                        success : function(result){
                            console.log(result)
                        },
                        statusCode: {
                            200: function(){
                                $('.zip').text('Zip');
                             $(location).attr('href', projeto_url + 'republicador/index.php');
				
                            }
                        }
                    }) //FIM DO BTN-NO
        })  

        $(document).on('click', '.btn-yes', function(){
            let okay = 'yes';
            $('#gameOver').css('display', 'none'); 
            $('.zip').text('Compactando...');
                $.ajax({
                    url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/zipador.php', 
                    type: 'POST',
                    data: {id: projeto_id, ok: okay}, 
                    dataType: 'json',
                    success : function(result){
                        console.log(result)
                    },
                    statusCode: {
                        200: function(){
                             $('.zip').text('Zip');
                            
                        }
                      }
                })
        
        })  //Fim do BTN_YES
    }) //FIM DO ZIPADOR

    $('.form-body').append(`<span class="dzip" style="float: right; position: relative; right: 40px; top: 7px; transition: 1s;"><img src="https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/download.png" style="transition:1s;" title="Baixar Zip"></span>`);
   
    $('.form-body').append(`<span class="trash" style="float: right; position: relative; right: 60px; top: 7px; transition: 1s;"><img src="https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/trash.png" width="16" style="transition:1s;" title="Apagar zip"></span>`);
    
    $('.trash').hover(function(){
        $('.trash img').css('cursor', 'pointer');
        $('.trash img').css('transform', 'scale(1.1)');
    }, function(){
        $(this).css('cursor', 'auto');
        $('.trash img').css('transform', 'scale(1)');
      });

    $(document).on('click', '.trash', function(){
        
        $.ajax({
            url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/del.php', 
            type: 'POST',
            data: {id: projeto_id},
            dataType: 'json'

        })

        alert('Excluido');
    });

    $('.dzip').hover(function(){
        $('.dzip img').css('cursor', 'pointer');
        $('.dzip img').css('transform', 'scale(1.1)');
    }, function(){
        $(this).css('cursor', 'auto');
        $('.dzip img').css('transform', 'scale(1)');
      });

        
    $(document).on('click', '.dzip', function(e) {
        var projeto_id = $("#projeto_id").val();
        e.preventDefault()
        $(location).attr('href', `https://painel.buscacliente.com.br/app/webroot/renders/${projeto_id}/site.zip`);
    });

    //Levantamento 

    $('.dropdown:nth-child(6) ul').append('<li><a href="#" class="levantamento" ><i class="fa fa-sort-amount-asc" aria-hidden="true"></i><span class="slev">Levantamento</span></a></li>');

    $('.dropdown:nth-child(6) ul').append('<li><a href="#" class="restcss" ><i class="fa fa-file-code-o" aria-hidden="true"></i><span class="cascate">Restaurar CSS</span></a></li>');
   
    $('.dropdown:nth-child(6) ul').append('<li><a href="#" class="gerarcss" ><i class="fa fa-code" aria-hidden="true"></i><span class="css">Backup-css.zip</span></a></li>');

    $('.dropdown:nth-child(6) ul').append('<li id="li-form"><form id="form-li"><input type="text" id="input-li"><input type="submit" id="btn-li"></form></li>');

    $(document).on('click', '.levantamento', function(e){
        $('.slev').text('Gerando...');
        e.preventDefault();
        $.ajax({
            url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/levantamento.php', 
            type: 'POST',
            statusCode : {
                200 : function (){
                    $('.slev').text('Levantamento');
                    var opp = confirm('Levantamento Gerado. Baixar? ');
                    if(opp){
                        $(location).attr('href', `https://painel.buscacliente.com.br/app/webroot/renders/Levantamento.xls`);
                    }
                }
            }
        })

    });

    //Restaurar CSS
    $(document).on('click', '.restcss', function(e){
        e.preventDefault();
        const urlParams = window.location.href;  

        function justNumbers(text) {
            var numbers = text.replace(/[^0-9]/g,'');
            return parseInt(numbers);
        }
    
        idProject = (justNumbers(urlParams));
    
          $.ajax({
            url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/resetcss.php', 
            type: 'POST',
            data: {id: idProject}, 
            dataType: 'json',
            statusCode: {
                200 : function(){
                    toastr.success('CSS Restaurado');
                }
            }
        })
    });

    //Manter CSS
    $('.gerarcss').on('click', function(e){
       e.preventDefault();
        $.ajax({
            url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/css.php',
            type: 'POST',
            data: {id: projeto_id},
            dataType: 'json'
        })
    });

    $('#form-li').on('submit', function (e) {
        e.preventDefault()
        page = $('#input-li').val()
        if(page != '') {
            function download(content, filename, contentType){
                if(!contentType){
                    contentType = 'application/octet-stream';
                }
                var a = document.createElement('a');
                var blob = new Blob([content], {'type':contentType});
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                a.click();
            }
            pagina = page.replaceAll('/', '_')

            $.ajax({
                url: 'https://painel.buscacliente.com.br/app/webroot/renders/funcoesextras/downloadPagina.php',
                type: 'POST',
                data: {id: projeto_id, pagina: pagina},
                success: function(retorno) {
                    if(!retorno) return alert('Arquivo não encontrado');

                    toastr.success("Download Concluído");
                    download(retorno, pagina)
                }
            })

        }
    })
}   
ziparProjetos();