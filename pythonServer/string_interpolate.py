import json

def interpolate(postdata):
    with open('./credentials/global_variables.json','r',encoding='utf-8') as gv:
      global_variables = json.load(gv)["contact_form_settings"]
      gv.close()
      with open (global_variables["html_file_path"], "r", encoding='utf-8') as f:
         html = f.read()
         variables = global_variables["template_variables"]
         for key in postdata.keys():
            variables[key]=postdata[key]
         try:
            html = html.format(**variables)
         except KeyError:
            print(postdata)
            print("key error")
         f.close()
         return html
