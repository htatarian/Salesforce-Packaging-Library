let fields = [];

function getData() {
    let table = document.getElementById('ViewAllPackage:theForm::packageComponentTable:tb');
    let tableHTML = table.innerHTML;
    let pattern = /(title="[A-Za-z0-9 \-\.\-\(\)_]*|colspan="1">[A-Za-z0-9 \-\.\-\(\)]*<\/)/mg;
    let results = tableHTML.match(pattern);

    for (let i = 0; i < results.length; i += 7) {
        let ignore = 'tLP_Translation';
        let name = results[i].replace('title=" - ', "");
        if (name !== ignore) {
            if (!Number(results[i + 5].replace('colspan="1">', '').replace('<\/', '').replace(' - Current', ''))
                && fields.filter(field => field.Name === name).length === 0) {
                fields.push({
                    Name: name,
                    ParentObject: results[i + 2].replace('colspan="1">', '').replace('<\/', ''),
                    Type: results[i + 3].replace('colspan="1">', '').replace('<\/', ''),
                    IncludedBy: results[i + 4].replace('colspan="1">', '').replace('<\/', ''),
                    Version: Number(results[i + 5].replace('colspan="1">', '').replace('<\/', '').replace(' - Current', '')),
                    OwnedBy: results[i + 6].replace('colspan="1">', '').replace('<\/', '')
                });
            }
        } else {
            i--;
        }
    }
    fields = fields.sort((a, b) => a.Version > b.Version ? 1 : -1);

    let next = document.getElementById('ViewAllPackage:theForm:mainDetailBlock:PackageComponentTableSection:componentsPageNavigator:pageNavigatorComponent:nextPageLink');
    if (next) {
        next.click();
        console.log('Searching...');
        return true;
    }
}

function findNew() {
    setTimeout(() => {
            if (getData()) {
                go();
            } else {
                console.log(fields);
            }
        }
        , 1000);
}

findNew();