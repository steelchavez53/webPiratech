document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Cargar el archivo JSON con los productos
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                // Encontrar el producto por ID
                const product = products.find(p => p.id == productId);

                if (product) {
                    // Llenar la página con los datos del producto
                    const productDetails = document.getElementById('product-details');
                    productDetails.innerHTML = `
                        <div class="row">
                            <div class="col-md-9 single_left">
                                <div class="single_image">
                                    <ul id="etalage">
                                        ${product.images.map(image => `
                                            <li>
                                                <a href="optionallink.html">
                                                    <img class="etalage_thumb_image" src="${image}" />
                                                    <img class="etalage_source_image" src="${image}" />
                                                </a>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                                <div class="single_right">
                                    <h3>${product.name}</h3>
                                    <p class="m_10">${product.description}</p>
                                    <ul class="options">
                                        <h4 class="m_12">Select a Size(cm)</h4>
                                        ${product.sizes.map(size => `<li><a href="#">${size}</a></li>`).join('')}
                                    </ul>
                                    <ul class="product-colors">
                                        <h3>Available Colors</h3>
                                        ${product.colors.map(color => `<li><a class="${color}" href="#"><span> </span></a></li>`).join('')}
                                        <div class="clear"> </div>
                                    </ul>
                                    <div class="btn_form">
                                        <form>
                                            <input type="submit" value="Buy Now" title="">
                                        </form>
                                    </div>
                                    <ul class="add-to-links">
                                        <li><img src="images/wish.png" alt=""><a href="#">Add to wishlist</a></li>
                                    </ul>
                                    <div class="social_buttons">
                                        <h4>${product.quantity} Items</h4>
                                        <button type="button" class="btn1 btn1-default1 btn1-twitter" onclick="">
                                            <i class="icon-twitter"></i> Tweet
                                        </button>
                                        <button type="button" class="btn1 btn1-default1 btn1-facebook" onclick="">
                                            <i class="icon-facebook"></i> Share
                                        </button>
                                        <button type="button" class="btn1 btn1-default1 btn1-google" onclick="">
                                            <i class="icon-google"></i> Google+
                                        </button>
                                        <button type="button" class="btn1 btn1-default1 btn1-pinterest" onclick="">
                                            <i class="icon-pinterest"></i> Pinterest
                                        </button>
                                    </div>
                                </div>
                                <div class="clear"> </div>
                            </div>
                            <div class="col-md-3">
                                <div class="box-info-product">
                                    <p class="price2">$${product.price.toFixed(2)}</p>
                                    <ul class="prosuct-qty">
                                        <span>Quantity:</span>
                                        <select class="form-control form-control-sm" id="quantity">
                                            ${[...Array(10).keys()].map(i => `<option>${i + 1}</option>`).join('')}
                                        </select>
                                    </ul>
                                    <button type="submit" name="Submit" class="exclusive">
                                        <span>Add to cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="desc">
                            <h4>Description</h4>
                           
                        </div>
                        <!-- Features Section Begin -->
                        <section class="pricing-table section">
                            <div class="container">
                                <div class="row">
                                    ${product.features.map(feature => `
                                        <div class="col-lg-4 col-md-12 col-12">
                                            <div class="single-table">
                                                <div class="table-head">
                                                    <div class="icon">
                                                        <i class="fa ${feature.icon}"></i>
                                                    </div>
                                                    <h4 class="title">${feature.title}</h4>
                                                </div>
                                                <ul class="table-list">
                                                    ${feature.details.map(detail => `
                                                    <li>
                                                     ${detail.includes('no') ? '<i class="fa fa-close" style="color: white; background-color: #808080; border-radius: 50%;"></i>' : '<i class="fa fa-check custom-fa-check"></i>'}
                                                     ${detail.replace('no', '')}
                                                   </li>

                                                    `).join('')}
                                                </ul>
                                                <div class="table-bottom">
                                                    <a class="btn" href="#">Ver detalles</a>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </section>
                        <!-- Features Section End -->
                    `;

                    // Inicializar el plugin Etalage después de cargar el contenido dinámicamente
                    $('#etalage').etalage({
                        thumb_image_width: 300,
                        thumb_image_height: 400,
                        source_image_width: 800,
                        source_image_height: 1000,
                        show_hint: true,
                        click_callback: function(image_anchor, instance_id){
                            alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"');
                        }
                    });
                } else {
                    productDetails.innerHTML = '<p>Producto no encontrado</p>';
                }
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
                document.getElementById('product-details').innerHTML = '<p>Error al cargar los detalles del producto</p>';
            });
    } else {
        document.getElementById('product-details').innerHTML = '<p>ID de producto no especificado</p>';
    }
});
