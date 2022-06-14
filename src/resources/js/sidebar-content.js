import data from '../json/sidebar-content.json'


export default function SidebarContent() {
    const data2 = data;
    const files = import.meta.globEager("../../plugins/*.json");
    const modules = {};
    for (const key in files) {
        modules[key.replace(/(\.\/|\.json)/g, "")] = files[key].default;
    }
    const all = JSON.parse(JSON.stringify(modules))


    const jsoncontent = {
        "posttype": "contenttype",
        "title": "Content Types",
        "url": "empty",
        "icon": "fa-file",
        "subtitles": [
        ]
    }
    let contentTypeUrl = [];
    let i = 0;
      for (let [key, value] of Object.entries(all)) {
          
        contentTypeUrl[i] = value[0].postType;
        i++;
      }
    jsoncontent.url = '/dashboard/edit?post_type=' + contentTypeUrl[0];
    Object.values(all).map((element, i) => {
        
        if (element[0].show_in_menu === 'sc-content-types') {
            jsoncontent.subtitles[i] = {
                posttype : element[0].postType,
                parenttype: "contenttype",
                title: element[0].labels[0].plural,
                title_singular: element[0].labels[0].singular,
                url: '/dashboard/edit?post_type=' + element[0].postType
            }
        }
        else return 0
    })
    data2.push(jsoncontent)
    const data3 = data2.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.title === thing.title && t.url === thing.url
        ))
    )
    return data3;
};
