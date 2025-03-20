# Saskia Bobinska's demo Studio

In this repo, you will find a couple of interesting studio solutions - Each branch has its own focus.

## Branches

### Main

Check out [main branch]('https://github.com/bobinska-dev/meetup/tree/main')

Main is the most minimal one and contains only the basic setup.

### dynamic-lists

Check out [dynamic-lists branch]('https://github.com/bobinska-dev/meetup/tree/dynamic-lists')

This branch shows how to create a dynamic list of options which does not need developer intervention to edit options.

### dynamic-languages

Check out [dynamic-languages branch]('https://github.com/bobinska-dev/meetup/tree/dynmic-languages')

adds some complexity and adds the same mechanism to handle languages in the Studio -> where even plugins and structures are dynamically based on the languages you have in your dataset.

### dynamic-markets

Check out [dynamic-markets branch]('https://github.com/bobinska-dev/meetup/tree/dynamic-markets')

uses the setup of the dynamic languages and adds a new layer of complexity by adding markets to the mix. those markets reference languages, and the Studio uses those markets and languages to dynamically create workspaces, with the markets languages also playing into plugins and structures.

### personalisation

Check out [personalisation branch]('https://github.com/bobinska-dev/meetup/tree/personalisation')

is an even more complex setup and adds personalisation to the mix. This means that the Studio will now also creates `person` documents for each Studio member and allows members to add bookmarks and also languages to their `person`.

#### Specials

- On top of all those goodies, I also added a bookmark inspector, which can be opened in all documents (button in the document header) and shows all bookmarks the current user has.
- A handy dashboard helps to manage the personalisation, but the same is also possible in the structure now.
- Its worth hovering over some of the parts of the custom components,because there are a lot fo shortcuts and hidden features.
