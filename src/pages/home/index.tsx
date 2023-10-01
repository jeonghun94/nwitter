import { styled } from 'styled-components';
import PostTweetForm from '@/components/tweet/form';
import Timeline from '@/components/timeline';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
