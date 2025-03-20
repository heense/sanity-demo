# Saskia Bobinska's demo Studio

In this repo, you will find a couple of interesting studio solutions - Each branch has its own focus.
If you want to see the most extensive one (where all other branches come together), please skip to [Personalisation](#Personalisation). 

## Branches

### Main

Check out [main branch](https://github.com/bobinska-dev/meetup/tree/main)

Main is the most minimal one and contains only the basic setup.

### dynamic-lists

Check out [dynamic-lists branch](https://github.com/bobinska-dev/meetup/tree/dynamic-lists)

This branch shows how to create a dynamic list of options which does not need developer intervention to edit options.

| ![Dynamic list options based on listOption documents](https://github.com/user-attachments/assets/02494dc1-1b43-45cf-88f4-1fa8dbce8b96) |
|:--:|
| *Dynamic list options based on listOption documents, which have fields for description and more...* |


### dynamic-languages

Check out [dynamic-languages branch](https://github.com/bobinska-dev/meetup/tree/dynmic-languages)

adds some complexity and implements the same mechanism of document-based configs to handle languages in the Studio ->  even plugins and structures are dynamically configured based on the languages you have in your dataset.
As you can see below, all language documents will be available to the document- and field-level i18n plugins.

|![Screenshot 2025-03-20 at 18 54 14](https://github.com/user-attachments/assets/18ab4802-3629-4aad-a8f3-9bcfe09f2dcd)|
|:--:|
|*Language documents are used to control internationalisation from the Studio*|

|![Screenshot 2025-03-20 at 18 55 00](https://github.com/user-attachments/assets/c02f4d40-cafa-4c00-b721-1607b2d10714)|
|:--:|
|*Those languages will be directly used in both i18n plugins and the structure for a better experience when working with languages. Another good thing about this approach, is that we can internationalist other parts of the Studio, such as the list of options titles and more*|

### dynamic-markets

Check out [dynamic-markets branch](https://github.com/bobinska-dev/meetup/tree/dynamic-markets)

uses the setup of the dynamic languages and adds a new layer of complexity by adding markets to the mix. those markets reference languages, and the Studio uses those markets and languages to dynamically create workspaces, with the market's languages also playing into plugins and structures.

| ![Screenshot 2025-03-20 at 18 59 30](https://github.com/user-attachments/assets/c6c8a781-2eb8-464d-aade-67ca039c9bb2) |
|:--:|
|*Markets get used to generate dynamic workspaces on runtime*|

| ![Screenshot 2025-03-20 at 19 00 13](https://github.com/user-attachments/assets/e5bcddaf-d437-4e20-8e86-ccd6abc01ab5) |
|:--:|
|*A markets languages are then also used to generate dynamic structures for each market workspace*|


### Personalisation

Check out [personalisation branch](https://github.com/bobinska-dev/meetup/tree/personalisation)

is an even more complex setup and adds personalisation to the mix. This means that the Studio will now also creates `person` documents for each Studio member and allows members to add bookmarks and also languages to their `person`.

| ![Screenshot 2025-03-20 at 19 01 10](https://github.com/user-attachments/assets/74f7d281-0866-41a3-8c9a-cae3e0c70443) |
|:--:|
|*Adding more personalisation options for editors can mean a lot of less work work for you long term. A minimal example would be the ability to bookmark other documents and also configure languages to remove those an editor does not speak to remove accidental mistakes and clutter in their structures.*|

#### Specials
It's worth hovering over some of the parts of the custom components because there are a lot of UX-shortcuts and hidden features.
  
##### Bookmark inspector

On top of all those goodies, I also added a **bookmark inspector**, which can be opened in all documents (button in the document header) and shows all bookmarks the current user has.
  ![Screenshot 2025-03-20 at 18 47 48](https://github.com/user-attachments/assets/7d847024-0291-4d9b-ba88-26804abd5380)
  
##### Personalised Dashboard
A handy **dashboard** helps to manage the personalisation, but the same is also possible in the structure now.
  ![Screenshot 2025-03-20 at 18 45 44](https://github.com/user-attachments/assets/d1b783d6-44bf-4d24-bbc4-45a4caa6b307)
  


