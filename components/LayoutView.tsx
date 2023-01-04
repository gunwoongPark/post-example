import { isNil } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import useUser from "../hooks/react-query/useUser";

const LayoutView = (props: PropsWithChildren<Record<never, any>>) => {
  // router
  const router = useRouter();

  const { userInfo, clearUser } = useUser();

  return (
    <S.Container>
      <header>
        <h1>
          <Link href="/">POST</Link>
        </h1>

        <nav>
          <ul>
            {(() => {
              if (isNil(userInfo)) {
                if (router.pathname !== "/sign-in") {
                  return (
                    <li>
                      <Link href="/sign-in">로그인</Link>
                    </li>
                  );
                } else {
                  return <></>;
                }
              } else {
                if (router.pathname !== "/my-page") {
                  return (
                    <>
                      <li>
                        {/* 마이페이지 */}
                        <Link href="/my-page">{userInfo.username}</Link>
                      </li>
                      <li>
                        <button onClick={() => clearUser()}>로그아웃</button>
                      </li>
                    </>
                  );
                }
                return (
                  <li>
                    <button onClick={() => clearUser()}>로그아웃</button>
                  </li>
                );
              }
            })()}
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
    </S.Container>
  );
};

export default LayoutView;

const S = {
  Container: styled.div`
    header {
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid black;

      h1 {
        display: inline-block;
        font-size: 36px;
        font-weight: 700;
        margin-left: 8px;
      }

      nav {
        ul {
          display: flex;
          align-items: center;

          li {
            margin-right: 8px;
            font-size: 18px;
            button {
              padding: 0;
              border: none;
              background-color: transparent;
              font-size: 18px;
              cursor: pointer;
            }
          }
        }
      }
    }
  `,
};
