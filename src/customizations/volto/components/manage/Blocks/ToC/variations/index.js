import DefaultTocRenderer from '@plone/volto/components/manage/Blocks/ToC/variations/DefaultTocRenderer';
import HorizontalMenu from './HorizontalMenu';

const ToCVariations = [
  {
    id: 'default',
    title: 'Listing (default)',
    view: DefaultTocRenderer,
    isDefault: true,
  },
  {
    id: 'horizontalMenu',
    title: 'Horizontal Menu',
    view: HorizontalMenu,
  },
];

export default ToCVariations;
