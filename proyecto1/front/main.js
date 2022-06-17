((Utils) => {
    const App = {
        htmlElements: {
            pokemonForm: document.getElementById('pokemon-form'),
            pokemonFormNameInput: document.getElementById('pokemon-name-input'),
            pokemonFormInputOptions: document.getElementById('pokemon-form-options'),
            pokemonFinderOutput: document.getElementById('pokemon-finder-output')
        },
        settings: {

        },
        utils: {
            ...Utils,
            getPokemonGeneralData: async (name, img) => {
                try {
                    const rawResponse = await App.utils.getDataFromBack({
                        name,
                        searchType: 'pokemon'
                    });
                    pokemonGeneralData = rawResponse.data.data
                    return App.templates.pokemonGeneralData(pokemonGeneralData, img);
                }
                catch (error) {

                }
            },
            getPokemonEvolutionData: async (name) => {

                try {
                    const rawResponse = await App.utils.getDataFromBack({
                        name,
                        searchType: 'especies'
                    });
                    const evolutionDataResponse = rawResponse.data.data
                    const evolutionsData = App.utils.getPokemonEvolutions(evolutionDataResponse.chain)
                    return App.templates.pokemoneEvolutionData(evolutionsData)
                }
                catch {

                }
            },
            getPokemonUbicacionData: async (name) => {
                try {
                    const rawResponse = await App.utils.getDataFromBack({
                        name,
                        searchType: 'ubicacion'
                    });
                    responseData = rawResponse.data.data

                    return responseData.length > 0 ? App.templates.pokemonUbicacionData(responseData) : `*Sin Ubicacion`;
                    //App.utils.getUbicacionDetails(responseData)
                }
                catch (error) {

                }
            }
        },
        templates: {
            pokemonGeneralData: ({ id, name, weight, height, sprites, stats, abilities }, img) => {

                const pokemonAbilities = abilities.map(
                    ({ ability, is_hidden }) =>
                        `<li>${App.utils.capitalize(ability.name)} ${is_hidden ? `<img src="assets/svg/ojo.svg" alt="">` : ""
                        }</li>`
                );
                var template = `<section class="pokemon-general-output">
                <section id="pokemon-general-data" class="pokemon-general-data">
                <h3>${App.utils.capitalize(name)} (${id})</h3>
                <h4>Peso/Altura</h4>
                <h4>${weight}/${height}</h4>
                <br>
                <section id="pokemon-general-data-optional">`;

                if (img) {
                    template += `
                    <h3>Sprites</h3>
                    <section class="pokemon-sprites">
                        <section class="default-sprites">
                        <img  src="${sprites.front_default}" alt="">
                        <img  src="${sprites.back_default}" alt="">
                        <p>Default</p>
                        </section>
                        <section class="shiny-sprites">
                        <img  src="${sprites.front_shiny}" alt="">
                            <img  src="${sprites.back_shiny}" alt="">
                            <p>Shiny</p>
                        </section>
                    </section>`;
                } else {
                    template += `
                    <h3>Habilidades</h3>
                    <ul>
                        ${pokemonAbilities.join("")}
                    </ul>`
                }
                template += `</section>
            </section>
            <br>
            <section class="pokemon-general-data" id="pokemon-general-data">
                <h3>Estadísticas</h3>
                <ul>
                    <li>
                        <label for="hp">HP</label><br>
                        <progress id="hp" max="180" value="${stats[0].base_stat}"></progress>
                    </li>
                    <li>
                        <label for="hp">ATT</label><br>
                        <progress id="hp" max="180" value="${stats[1].base_stat}"></progress>
                    </li>
                    <li>
                        <label for="hp">DEF</label><br>
                        <progress id="hp" max="180" value="${stats[2].base_stat}"></progress>
                    </li>
                    <li>
                        <label for="hp">S.ATT</label><br>
                        <progress id="hp" max="180" value="${stats[3].base_stat}"></progress>
                    </li>
                    <li>
                        <label for="hp">S.DEF</label><br>
                        <progress id="hp" max="180" value="${stats[4].base_stat}"></progress>
                    </li>
                    <li>
                        <label for="hp">SPD</label><br>
                        <progress id="hp" max="180" value="${stats[5].base_stat}"></progress>
                    </li>
                </ul>
                
            </section>
            </section>
                `;

                return template;
            },
            pokemoneEvolutionData: (evolutionsObject) => {
                const pokemonEvolutions = evolutionsObject.length > 1 ? evolutionsObject.map(
                    ({ name, is_baby }) =>
                        `<li>${name} ${is_baby ? `<img src="assets/svg/bebe.svg" alt="">` : ""
                        }</li>`
                ) : ['<li>Sin evolución</li>'];

                return `
                <section class="pokemon-evolutions-data">
                <section class="pokemon-evolutions-data-child">
                    <section class="" >
                        <h4 class="h3">Cadena Evolutiva</h4>
                        <ul>
                            ${pokemonEvolutions.join("")}
                        </ul>
                    </section>
                </section>
            </section>
                `
            },
            pokemonUbicacionData: (ubicacionObject) => {
                let template = `
                <section class="pokemon-ubicacion-data">
                <section class="pokemon-ubicacion-data-child">
                    <table class="pokemon-ubicacion-data-table">
                        <tr >
                            <th class="table-data1">Ubicación</th>
                            <th class="table-data">Juegos</th>
                            <th class="table-data">Método</th>
                            <th class="table-data">Nivel Min</th>
                            <th class="table-data">Nivel Max</th>
                        </tr>`;

                ubicacionObject.map((key) => {
                    template += `
                            <tr>
                            <td class="table-data">${App.utils.capitalize(key.location_area.name)}</td>
                            <td class="table-data">
                                <ul>`;
                    const otro = [key.version_details[0].encounter_details[0]];
                    const juegos = key.version_details
                    juegos.map((e) => {
                        template += `<li>${App.utils.capitalize(e.version.name)}</li>`
                    })
                    otro.map((e) => {
                        template += `</ul>
                                    </td>
                                    <td class="table-data">${e.method.name}</td>
                                    <td class="table-data">${e.min_level}</td>
                                    <td class="table-data">${e.max_level}</td>
                                    </tr>`
                    })
                })
                template += `</table>
                </section>
            </section>`;
                return template;
            }
        },
        handlers: {
            pokemonFormOnSubmit: async (e) => {
                e.preventDefault()
                var template = "";
                const pokemonName = App.htmlElements.pokemonFormNameInput.value.trim()

                if (pokemonName.length == 0) {
                    console.log("name vacio")
                    return
                }

                const options = App.htmlElements.pokemonFormInputOptions.childNodes
                const optionSelect = App.utils.getCheckedBoxes(options)

                template = await App.utils.getPokemonGeneralData(pokemonName, optionSelect['sprites'] ? true : false)

                if (optionSelect['evoluciones']) {
                    template += await App.utils.getPokemonEvolutionData(pokemonName)
                }
                if (optionSelect['ubicacion']) {
                    template += await App.utils.getPokemonUbicacionData(pokemonName)
                }

                App.htmlElements.pokemonFinderOutput.innerHTML = template
            }
        },
        init: () => {
            App.htmlElements.pokemonForm.addEventListener('submit', App.handlers.pokemonFormOnSubmit)
        }
    }
    App.init();
})(document.Utils)