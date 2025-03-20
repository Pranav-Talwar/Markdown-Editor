import { useAtomValue } from "jotai";
import { editorState } from "../store/atoms/editor";

const SideBar = () => {

    const editor = useAtomValue(editorState);

    if (!editor) {
        console.warn(`Editor is not initialized yet.`)
        return( 
            <div>
                Loading ...
            </div>
        )
    }

    // editor.commands.insertContent({
    //     type: 'text',
    //     text: '😎', // The emoji you want
    //     marks: [{
    //         type: 'textStyle',
    //         attrs: { 
    //         fontSize: '48px', // Adjust size
    //         display: 'inline-block' 
    //         }
    //     }]
    // });
    

    function insertSVG(event) {
        if (event) event.preventDefault();
        
        // Store the current selection position before inserting
        const { from } = editor.state.selection;
        
        // Insert the SVG
        editor.commands.insertContent({
          type: 'image',
          attrs: {
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
            width: 50,
            height: 50,
            style: 'display: inline-block;'
          }
        });
        
        // Compute where the cursor should go - just after the inserted image
        // This gets the current document state after insertion
        const currentState = editor.state;
        
        // Find the image node we just inserted
        const resolvedPos = currentState.doc.resolve(from);
        const node = resolvedPos.nodeAfter; // This should be our image
        
        // If we found a node, place cursor just after it
        if (node) {
          const posAfterNode = from + node.nodeSize;
          
          // Set selection after the node and focus
          editor.commands.setTextSelection(posAfterNode);
          editor.commands.focus();
        } else {
          // Fallback if we can't identify the node
          editor.commands.focus();
        }
      }
      
    

      function insertGitHubImage() {
        editor.commands.insertContent('![Bold Icon](src/assets/1_MenuBar/1_bold.svg)')
      }
      
    return (
        <>
        <div className="w-full bg-slate-50 h-screen"> 
            😒

            <div className="flex flex-col my-auto h-full">
                <button data-tip="2" onClick={(e)=> {insertSVG(e)}}>
                    <span className="text-[5rem]">😎</span> 
                </button>
                <button>
                    <span className="text-[5rem]">😾</span>
                </button>
            </div>
        </div>
        </>
    )
}

function insertIcons(item) {
    const value = item.target.value;
}

export default SideBar;