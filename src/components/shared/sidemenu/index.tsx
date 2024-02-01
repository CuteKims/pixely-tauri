import { useContext } from 'react';
import { SubpageMap } from '../../../types/consts'

import { RadioButton } from '../menubutton'

import styles from './sidemenu.module.css'
import { pageStackContext } from '../../App/contextWrappers/page_stack';

const Sidemenu: React.FC<{subpagesMap: SubpageMap}> = ({subpagesMap}) => {
    let context = useContext(pageStackContext);
    return (
        <div id={styles.sidemenu}>
            {Object.entries(subpagesMap.map).map((subpage) => (
                <RadioButton key={subpage[0]} props={{
                    displayName: subpage[1].friendlyName,
                    isDisplay: subpage[1].display,
                    isSelected: context?.getLastSubpage()?.pageKey == subpage[0],
                    callback: () => context?.pushSubpage({
                        pageKey: subpage[0],
                        internalState: subpagesMap.map[subpage[0]].initialState
                    }),
                }} />
            ))}
        </div>
    )
}

export default Sidemenu